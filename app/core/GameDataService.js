(function () {
    'use strict';

    angular
      .module('app.core')
      .factory('GameDataService', ['$q', '$rootScope','FIREBASE_URL', GameDataService]);



    function GameDataService($q, $rootScope,FIREBASE_URL) {
        var dataRef = new Firebase(FIREBASE_URL);
        var game = [];
        var boxRef = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Boxes');
        var player1Ref = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Players/player1');
        var player2Ref = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Players/player2');




        /*****service API******/
        return ({

            GetBoxColors: GetBoxColors,
            GetPlayer1: GetPlayer1,
            GetPlayer2: GetPlayer2,
            UpdatePlayer1: UpdatePlayer1,
            UpdatePlayer2: UpdatePlayer2,
            UpdateBox : UpdateBox
            
        });


        /*****public methods******/

        function GetBoxColors() {

            var promise = [];
            var deferred = $q.defer();
            boxRef.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }

        function GetPlayer1() {

            var promise = [];
            var deferred = $q.defer();
            player1Ref.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }

        function GetPlayer2() {

            var promise = [];
            var deferred = $q.defer();
            player2Ref.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }

        function UpdatePlayer1(playerName) {

            var promise = [];
            var deferred = $q.defer();
            player1Ref.set({ name: playerName });
            
            var promise = [];
            var deferred = $q.defer();
            dataRef.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }

        function UpdatePlayer2(playerName) {

            var promise = [];
            var deferred = $q.defer();
            player2Ref.set({ name: playerName });
            return (deferred.promise);
        }

        function UpdateBox(id,value)
        {
            var ref = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Boxes/' + id);
            ref.set({ value: value });

            var promise = [];
            var deferred = $q.defer();
            ref.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }



        
    } /*****end of GameDataService******/

})();


