(function () {

    'use strict';

    angular
        .module('app')
        .controller('PDFCtrl', PDFCtrl);

    PDFCtrl.$inject = ['PDFService'];

    /**
     * Handles the PDF commenting
     */
    function PDFCtrl(PDFService) {
        var ctrl = this;
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
                { page: 1, top: 20, left: 30, user: "Foo", comment: "Das ist ein Testkommentar" },
                { page: 1, top: 50, left: 60, user: "Test", comment: "Hallo?" },
                { page: 2, top: 50, left: 10, user: "Bar", comment: "Wirklich?" },
                { page: 2, top: 100, left: 50, user: "Baz", comment: "WORD!" }
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

        //////////////////////

        angular.extend(ctrl, {
            annotations: getAnnotationData(),
            getNextPage: getNextPage,
            getPrevPage: getPrevPage
        });
    }

})();