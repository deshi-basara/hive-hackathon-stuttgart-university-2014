(function () {

    'use strict';

    angular
        .module('app')
        .controller('PDFCtrl', PDFCtrl);

    PDFCtrl.$inject = ['PDFService', '$scope'];

    /**
     * Handles the PDF commenting
     */
    function PDFCtrl(PDFService, $scope) {
        var ctrl = this,
            currentPage = 1,
            totalPages = 1;
        PDFService.url = getPDFUrl();

        initPDFViewer();

        /**
         * Initializes the PDF viewer
         */
        function initPDFViewer() {
            PDFService.downloadPDF();
        }

        /**
         * Get the url to the PDF from the server
         */
        function getPDFUrl() {
            var exampleURL = "../../../test.pdf";
            return exampleURL;
        }

        /**
         * Get the data from the server
         */
        function getAnnotationData() {
            var exampleData = [
                { page: 1, top: 50, left: 30, user: "Foo", comment: "Das ist ein Testkommentar" },
                { page: 1, top: 250, left: 60, user: "Test", comment: "Hallo?" },
                { page: 2, top: 75, left: 10, user: "Bar", comment: "Wirklich?" },
                { page: 2, top: 150, left: 150, user: "Baz", comment: "WORD!" }
            ];
            return exampleData;
        }

        /**
         * Renders the next page
         */
         function getNextPage() {
            PDFService.onNextPage();
         }

         /**
         * Renders the previous page
         */
         function getPrevPage() {
            PDFService.onPrevPage();
         }

         /**
         * Zooms in
         */
         function zoomIn() {
            PDFService.zoomIn();
         }

         /**
         * Zooms out
         */
         function zoomOut() {
            PDFService.zoomOut();
         }

        $scope.$on('pageChanged', function(e, value) {
            ctrl.currentPage = value;
        });

        $scope.$on('totalPagesChanged', function(e, value) {
            ctrl.totalPages = value;
            $scope.$apply();
        });

        $scope.$on('zoomChanged', function(e, zoomStep) {
            ctrl.annotations.forEach(function(item) {
                if (item.page === ctrl.currentPage) {
                    item.top = item.top + (60 * zoomStep * (item.top / 55));
                    item.left = item.left + (50 * zoomStep * (item.left / 40));
                }
            });
        });

        //////////////////////

        angular.extend(ctrl, {
            annotations: getAnnotationData(),
            getNextPage: getNextPage,
            getPrevPage: getPrevPage,
            currentPage: currentPage,
            totalPages: totalPages,
            zoomIn: zoomIn,
            zoomOut: zoomOut
        });
    }

})();