(function () {
    'use strict';

    angular
      .module('app.core')
      .factory('GameDataService', ['$q', '$rootScope','$timeout','FIREBASE_URL', GameDataService]);



    function GameDataService($q, $rootScope, $timeout,FIREBASE_URL) {
        var dataRef = new Firebase(FIREBASE_URL);
        var boxRef = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Boxes');
        var player1Ref = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Players/player1');
        var player2Ref = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Players/player2');
        var gameRef = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/GameStarted');
        
        /*****events******/

      
        boxRef.on('child_changed', function (snapshot) {
            $timeout(function () {
                $rootScope.$broadcast('boxChanged');
            }, 100);
        });


        /*****service API******/
        return ({

            GetBoxColors: GetBoxColors,
            GetPlayer1: GetPlayer1,
            GetPlayer2: GetPlayer2,
            UpdatePlayer1: UpdatePlayer1,
            UpdatePlayer2: UpdatePlayer2,
            UpdateBox: UpdateBox,
            ClearAllBoxes: ClearAllBoxes,
            GetGameStatus: GetGameStatus,
            StartTheGame: StartTheGame,
            ResetTheGame: ResetTheGame
            
        });


        /*****public methods******/
        function StartTheGame() {

            var promise = [];
            var deferred = $q.defer();
            gameRef.set({ value: true });
            return (deferred.promise);
        }

        function ResetTheGame() {

            gameRef.set({ value: false });
            

            var promise = [];
            var deferred = $q.defer();
            gameRef.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }

        function GetGameStatus() {

            var promise = [];
            var deferred = $q.defer();
            gameRef.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }

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

        function ClearAllBoxes() {

            for (var i = 0; i < 9; i++)
            {
                var ref = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Boxes/' + i);
                ref.set({value:0});
            }

            var promise = [];
            var deferred = $q.defer();
            var boxRef = new Firebase('https://dazzling-torch-8270.firebaseio.com/Game/Boxes');
            gameRef.once('value', function (snapshot) {
                promise = snapshot.val();
                deferred.resolve(promise);
            });
            return (deferred.promise);
        }



        
    } /*****end of GameDataService******/

})();


