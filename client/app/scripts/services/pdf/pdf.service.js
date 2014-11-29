(function() {

    'use strict';

    angular
        .module('app')
        .factory('PDFService', PDFService);

    PDFService.$inject = ['$http', 'config', '$q', '$rootScope'];

    /**
     * Service for handling PDFs
     */
    function PDFService($http, config, $q, $rootScope) {

        var service = {
            url: null,
            pdfDoc: null,
            pageNum: 1,
            pageRendering: false,
            pageNumPending: null,
            scale: 0.8,
            initialScale: 0.8,
            useInitialScale: true,
            canvas: document.getElementById('viewerCanvas'),
            ctx: document.getElementById('viewerCanvas').getContext('2d'),

            renderPage: renderPage,
            queueRenderPage: queueRenderPage,
            onPrevPage: onPrevPage,
            onNextPage: onNextPage,
            downloadPDF: downloadPDF,
            zoomIn: zoomIn,
            zoomOut: zoomOut
        };

        return service;

        ///////////////


        function renderPage(num) {
            service.pageRendering = true;
            service.pdfDoc.getPage(num).then(function(page) {
                var viewport = page.getViewport(service.scale);
                if (service.useInitialScale) {
                    service.scale = service.initialScale;
                    viewport = page.getViewport(service.scale);
                    service.canvas.height = viewport.height;
                    service.canvas.width = viewport.width;
                }
                var renderContext = {
                    canvasContext: service.ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    service.pageRendering = false;
                    if (service.pageNumPending !== null) {
                        service.renderPage(service.pageNumPending);
                        service.pageNumPending = null;
                    }
                });
            });
        }

        function queueRenderPage(num) {
            if (service.pageRendering) {
                service.pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        function onPrevPage() {
             if (service.pageNum <= 1) {
                return;
            }
            service.pageNum--;
            $rootScope.$broadcast('pageChanged', service.pageNum);
            service.useInitialScale = true;
            queueRenderPage(service.pageNum);
        }

        function onNextPage() {
            if (service.pageNum >= service.pdfDoc.numPages) {
                return;
            }
            service.pageNum++;
            $rootScope.$broadcast('pageChanged', service.pageNum);
            service.useInitialScale = true;
            queueRenderPage(service.pageNum);
        }

        function downloadPDF() {
            PDFJS.getDocument(service.url).then(function (pdfDoc_) {
                service.pdfDoc = pdfDoc_;
                $rootScope.$broadcast('totalPagesChanged', service.pdfDoc.numPages);
                renderPage(service.pageNum);
                $rootScope.$broadcast('loader.hide');
            });
        }

        function zoomIn() {
            service.scale = service.scale + 0.1;
            $rootScope.$broadcast('zoomChanged', 0.1);
            service.useInitialScale = false;
            queueRenderPage(service.pageNum);
        }

        function zoomOut() {
            service.scale = service.scale - 0.1;
            $rootScope.$broadcast('zoomChanged', -0.1);
            service.useInitialScale = false;
            queueRenderPage(service.pageNum);
        }
    }


})();