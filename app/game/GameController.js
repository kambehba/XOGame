(function () {
    'use strict';

    angular
      .module('app.game')
      .controller('GameController', ['$scope','GameDataService', GameController]);

    function GameController($scope, GameDataService) {

        var vm = this;
        vm.startTheGameLable = "Start the Game";
        vm.ShowBoxes = false;
        vm.ShowLoading = true;
        vm.ShowMainPage = false;
        vm.ShowPlayer1StartedTheGame = false;
        vm.player1 = "";
        vm.player2 = "";
        vm.PlayerName = "";
        vm.IsSecondPlayer = false;
        
        //Default all boxex to zero which is code for color white
        vm.Box1Style = 0;
        vm.Box2Style = 0;
        vm.Box3Style = 0;
        vm.Box4Style = 0;
        vm.Box5Style = 0;
        vm.Box6Style = 0;
        vm.Box7Style = 0;
        vm.Box8Style = 0;
        vm.Box9Style = 0;

        //load color codes from database and paint the boxes 
        LoadBoxColors();

        //update player name based on first or second player situation
        UpdatePageWithPlayer();

        
        /*****puplic methods******/

        vm.StartTheGame = function ()
        {
            vm.IsSecondPlayer = false;
            vm.ShowLoading = false;
            vm.ShowMainPage = true;
            vm.ShowBoxes = true;

            //Check if user trys to join the game as oppose to starting the game
            if (vm.startTheGameLable == "Join the Game") { vm.IsSecondPlayer = true; UpdateSecondPlayer(); return; }

            //check if someone else has started the game
            GameDataService.GetPlayer1().then(function (promise) {
            vm.player1 = promise.name;
            if (vm.player1 == "") {
                vm.player1 = vm.PlayerName;
                GameDataService.UpdatePlayer1(vm.player1).then(function (promise) {
                    UpdatePageWithPlayer();
                });
            }
            });

            
        }


        //Box Click Handlers
        vm.Box1Clicked = function ()
        {
            var colorCode = ""
            if(vm.IsSecondPlayer) colorCode = 2;
            else colorCode =1;
            GameDataService.UpdateBox(0, colorCode).then(function (promise) {LoadBoxColors();}); 
        }

        vm.Box2Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(1, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        vm.Box3Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(2, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        vm.Box4Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(3, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        vm.Box5Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(4, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        vm.Box6Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(5, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        vm.Box7Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(6, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        vm.Box8Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(7, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        vm.Box9Clicked = function () {
            var colorCode = ""
            if (vm.IsSecondPlayer) colorCode = 2;
            else colorCode = 1;
            GameDataService.UpdateBox(8, colorCode).then(function (promise) { LoadBoxColors(); });
        }

        

        /*****private methods******/
        function PaintBoxes(boxData) {
            vm.Box1Style = boxData[0].value;
            vm.Box2Style = boxData[1].value;
            vm.Box3Style = boxData[2].value;
            vm.Box4Style = boxData[3].value;
            vm.Box5Style = boxData[4].value;
            vm.Box6Style = boxData[5].value;
            vm.Box7Style = boxData[6].value;
            vm.Box8Style = boxData[7].value;
            vm.Box9Style = boxData[8].value;
            

        }

        function UpdatePageWithPlayer() {
            GameDataService.GetPlayer1().then(function (promise) {
                vm.ShowLoading = false;
                vm.ShowMainPage = true;
                vm.player1 = promise.name;
                if (vm.player1 != "") {
                    vm.startTheGameLable = "Join the Game";
                    vm.ShowPlayer1StartedTheGame = true;
                }
                else {
                    vm.startTheGameLable = "Start the Game";
                    vm.ShowPlayer1StartedTheGame = false;
                }

            });

            GameDataService.GetPlayer2().then(function (promise) {
                vm.ShowLoading = false;
                vm.ShowMainPage = true;
                vm.player2 = promise.name;
               
            });
        }

        function UpdateSecondPlayer() {
            
            GameDataService.UpdatePlayer2(vm.PlayerName).then(function (promise) {UpdatePageWithPlayer();});
        }

        function LoadBoxColors()
        {
            GameDataService.GetBoxColors().then(function (promise) {
                var boxData = promise;
                PaintBoxes(boxData);

            });

        }



    }/*****end of GameController******/

})();
