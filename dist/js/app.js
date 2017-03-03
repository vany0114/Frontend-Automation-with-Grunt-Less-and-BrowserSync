(function () {
    'use strict';

    angular.module('talosTest', ['ngRoute']);

})();
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
(function () {
    'use strict';

    angular
        .module('talosTest')
        .factory('testFactory', testFactory);

    function testFactory() {        

        var _getPatientInformation = function () {

            return {    name: "Patty Friendman", 
                        addressLine1: "221 W.Colorado Blvd", 
                        addressLine2: "Dallas, TX 75208", 
                        phoneNumber: "214-943-9222",
                        birthDate: "07/12/74",
                        age: 41,
                        status: "ESRD" };
        };

        var _getHospitalInformation = function () {

            return {    name: "Premier PHC", 
                        addressLine1: "2340 East Trinity Mills Road", 
                        addressLine2: "Carrolton, TX 75006", 
                        office: "Suite 250",
                        phoneNumber: "1-855-792-4584",
                        fax: "972-387-3201" };
        };

        var _getRiskStratification = function () {

            return {    current: 4,
                        projected: 4,
                        y2014: 5,
                        y2015: 3 };
        };

        var _getFinancialSummaryInformation = function(){
            return [{   name: 'Projected',
                        data: [53102990]
                    },{
                        name: 'YTD',
                        data: [9367722]
                    }];
        };

        var _getPhysicianGroupsInformation = function(){
            return [{   name: 'Texas Heath Physicians Group',
                        data: [5324000, 4805000, 5800000, 4600000, 4300000]
                    },{
                        name: 'Genesis Physicians Group',
                        data: [4805000]
                    },{
                        name: 'Uptown Physicians Group',
                        data: [5800000]
                    },{
                        name: 'HealthCore Physicians Group',
                        data: [4600000]
                    }
                    ,{
                        name: 'JeffersonMed',
                        data: [4300000]
                    }];
        };

        return {
            getPatientInformation: _getPatientInformation,
            getHospitalInformation: _getHospitalInformation,
            getRiskStratification: _getRiskStratification,
            getFinancialSummaryInformation: _getFinancialSummaryInformation,
            getPhysicianGroupsInformation : _getPhysicianGroupsInformation
        };
    }
})();