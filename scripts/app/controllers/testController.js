(function () {
    'use strict';

    angular
        .module('talosTest')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when("/", {
                    controller: "businessLeaderController",
                    templateUrl: "../views/businessLeader.html"
                })
                .when("/businessLeader", {
                    controller: "businessLeaderController",
                    templateUrl: "../views/businessLeader.html"
                })
                .when("/patient", {
                    controller: "patientController",
                    templateUrl: "../views/patient.html"
                })
                .otherwise(
                {
                    redirectTo: "/"
                });
        }])
        .directive('hcBarChart', function () {
            return {
                        restrict: 'E',
                        template: '<div></div>',
                        scope: {
                            title: '@',
                            data: '=',
                            categories: '=',
                            height: '=',
                            width: '='
                        },
                        link: function (scope, element) {
                            Highcharts.chart(element[0], {
                                chart: {
                                    type: 'bar',
                                    spacingBottom: 0,
                                    spacingTop: 0,
                                    spacingLeft: 0,
                                    spacingRight: 0,
                                    height: scope.height,
                                    width: scope.width
                                },
                                title: {
                                    text: scope.title
                                },
                                xAxis: {
                                    categories: scope.categories
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: null
                                    }
                                },
                                plotOptions: {
                                    series: {
                                        stacking: 'normal'
                                    }
                                },
                                legend: {
                                    reversed: true
                                },
                                series: scope.data
                            });
                        }
            };
        })
        .controller('businessLeaderController', businessLeaderController)
        .controller('patientController', patientController);

    businessLeaderController.$inject = ['$scope', 'testFactory'];
    patientController.$inject = ['$scope', 'testFactory'];

    function businessLeaderController($scope, testFactory) {

        $scope.hospitalInformation = testFactory.getHospitalInformation();

        //Overal Financial Summary Chart
        $scope.chartData = testFactory.getFinancialSummaryInformation();
        $scope.categories = ['YTD'];

        // Physician Groups Chart
        $scope.physicianData = testFactory.getPhysicianGroupsInformation();
        $scope.physicianCategories = [  'Texas Heath Physicians Group', 'Genesis Physicians Group', 
                                        'Uptown Physicians Group', 'HealthCore Physicians Group', 'JeffersonMed'];
    };

    function patientController($scope, testFactory) {

        $scope.patientInformation = testFactory.getPatientInformation();
        $scope.riskStratification = testFactory.getRiskStratification();
    };

})();