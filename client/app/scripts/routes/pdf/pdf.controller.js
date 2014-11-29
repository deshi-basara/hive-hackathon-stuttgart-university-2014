(function () {

    'use strict';

    angular
        .module('app')
        .controller('PDFCtrl', PDFCtrl);

    PDFCtrl.$inject = ['PDFService', '$scope', '$q', '$http', 'config'];

    /**
     * Handles the PDF commenting
     */
    function PDFCtrl(PDFService, $scope, $q, $http, config) {
        var ctrl = this,
            currentPage = 1,
            totalPages = 1,
            annotations = null,
            mutedPeople = [];
        PDFService.url = getPDFUrl();

        initPDFViewer();
        getAnnotationData().then(function(data) {
            console.log(data);
            annotations = data;
        });

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
         * Get the data for all annotations from the server
         * @return {promise}     [$q-promise]
         */
        function getAnnotationData() {
            var q = $q.defer();

            // make the request
            $http({
                method: 'GET',
                url: config.apiUrl + '/annotations/6'
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }

        /**
         * Checks if a user is muted
         */
         function isMuted(person) {
            // TODO: REST Schnittstelle
            return false;
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
            annotations: annotations,
            getNextPage: getNextPage,
            getPrevPage: getPrevPage,
            currentPage: currentPage,
            totalPages: totalPages,
            zoomIn: zoomIn,
            zoomOut: zoomOut,
            isMuted: isMuted
        });
    }

})();