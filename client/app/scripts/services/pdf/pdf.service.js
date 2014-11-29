(function() {

    'use strict';

    angular
        .module('app')
        .factory('PDFService', PDFService);

    PDFService.$inject = ['$http', 'config', '$q'];

    /**
     * Service for handling PDFs
     */
    function PDFService($http, config, $q) {

        var service = {
            url: null,
            pdfDoc: null,
            pageNum: 1,
            pageRendering: false,
            pageNumPending: null,
            scale: 0.8,
            canvas: document.getElementById('viewerCanvas'),
            ctx: document.getElementById('viewerCanvas').getContext('2d'),

            renderPage: renderPage,
            queueRenderPage: queueRenderPage,
            onPrevPage: onPrevPage,
            onNextPage: onNextPage,
            downloadPDF: downloadPDF
        };

        return service;

        ///////////////


        function renderPage(num) {
            service.pageRendering = true;
            service.pdfDoc.getPage(num).then(function(page) {
                var viewport = page.getViewport(service.scale);
                service.canvas.height = viewport.height;
                service.canvas.width = viewport.width;
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
                document.getElementById('page_num').textContent = service.pageNum;
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
            queueRenderPage(service.pageNum);
        }

        function onNextPage() {
            if (service.pageNum >= service.pdfDoc.numPages) {
                return;
            }
            service.pageNum++;
            queueRenderPage(service.pageNum);
        }

        function downloadPDF() {
            PDFJS.getDocument(service.url).then(function (pdfDoc_) {
                service.pdfDoc = pdfDoc_;
                document.getElementById('page_count').textContent = service.pdfDoc.numPages;
                renderPage(service.pageNum);
            });
        }
    }


})();