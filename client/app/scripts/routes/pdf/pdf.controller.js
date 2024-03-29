(function () {

    'use strict';

    angular
        .module('app')
        .controller('PDFCtrl', PDFCtrl);

    PDFCtrl.$inject = ['PDFService', '$scope', '$q', '$http', 'config', '$modal', 'SocketService', '$stateParams'];

    /**
     * Handles the PDF commenting
     */
    function PDFCtrl(PDFService, $scope, $q, $http, config, $modal, SocketService, $stateParams) {
        var ctrl = this,
            currentPage = 1,
            totalPages = 1,
            annotations = null,
            mutedPeople = [];
        PDFService.url = "../../../test.pdf";
        initPDFViewer();
        /*getPDFUrl().then(function(success) {
            PDFService.url = success;
            initPDFViewer();
        });*/
        getAnnotationData().then(function(data) {
            ctrl.annotations = data;
        });

        /**
         * Initializes the PDF viewer
         */
        function initPDFViewer() {
            if(!SocketService.socket) {
                // try again
                SocketService.connect().then(function() {
                    // success, initialize chat
                    initPDFViewer();
                }, function() {

                });
            }
            else {

                PDFService.downloadPDF();
                checkIfUserIsProf().then(function(isProf) {
                    if (isProf) {
                        ctrl.hideComments = true;
                    }
                });
                ctrl.profPage = 1;
                SocketService.getProfPageChange(function (page) {
                    ctrl.profPage = page;
                    $scope.$apply();
                });
                SocketService.getAnnotationMsg(function (annotations) {
                    ctrl.annotations = annotations;
                });
            }
        }

        /**
         * Get the url to the PDF from the server
         */
        function getPDFUrl() {
            var q = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/media/' + $stateParams.docid,
                withCredentials: true
            }).success(function(data) {
                // TODO: create URL from Stream so PDF.js can load it
                // TODO: for now, we're faking it
                var url = window.URL || window.webkitURL;
                var pdfURL = url.createObjectURL(data);
                q.resolve(pdfURL);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
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
                url: config.apiUrl + '/annotations/' + $stateParams.docid,
                withCredentials: true
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }

        function saveComment(commentModel) {
            var q = $q.defer();

            // make the request
            $http({
                method: 'POST',
                url: config.apiUrl + '/annotation/',
                data: commentModel,
                withCredentials: true
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }

        function openCommentModal(event) {
            var x = event.layerX;
            var y = event.layerY;
            var modalInstance = $modal.open({
                templateUrl: 'comment-modal.html',
                controller: function($scope) {
                    $scope.comment = {
                        content: "",
                        page: ctrl.currentPage,
                        docid: $stateParams.docid,
                        x: x,
                        y: y
                    };
                    $scope.ok = function() {
                        modalInstance.close();
                        ctrl.saveComment($scope.comment).then(function(success) {
                            SocketService.propagateAnnotationAdded($scope.comment);
                        });
                    }
                },
                size: 'sm'
            });
        }

        function checkIfUserIsProf() {
            var q = $q.defer();

            // make the request
            $http({
                method: 'GET',
                url: config.apiUrl + '/user/role/',
                withCredentials: true
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
            propagateProfPageChange();
         }

         /**
         * Renders the previous page
         */
         function getPrevPage() {
            PDFService.onPrevPage();
            propagateProfPageChange();
         }

        function propagateProfPageChange() {
            checkIfUserIsProf().then(function(isProf) {
                if (isProf) {
                    SocketService.propagateProfPage(ctrl.currentPage);
                }
            });
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
                    item.y = item.y + (60 * zoomStep * (item.y / 55));
                    item.x = item.x + (50 * zoomStep * (item.x / 40));
                }
            });
        });

        //////////////////////

        angular.extend(ctrl, {
            getNextPage: getNextPage,
            getPrevPage: getPrevPage,
            currentPage: currentPage,
            totalPages: totalPages,
            zoomIn: PDFService.zoomIn,
            zoomOut: PDFService.zoomOut,
            isMuted: isMuted,
            saveComment: saveComment,
            openCommentModal: openCommentModal
        });
    }

})();