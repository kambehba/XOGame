(function () {
    'use strict';

    angular
      .module('app.game')
      .controller('GameController', ['$scope','GameDataService', GameController]);

    function GameController($scope, GameDataService) {

        var vm = this;
        vm.startTheGameLable = "Start the Game";
        vm.ShowBoxes = true;
        vm.ShowLoading = true;
        vm.ShowMainPage = false;
        vm.player1 = "";
        vm.player2 = "";
        vm.PlayerName = "";
        vm.winner = "";
        vm.IsSecondPlayer = false;
        vm.showEnterName = true;
        vm.playerVsPlayer = false;
        vm.ShowWinner = false;
        vm.BoxData = {};
        
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

        SetPlayersAndStartTheGame();
        
        if (vm.IsSecondPlayer) LoadBoxColors();
        else GameDataService.ClearAllBoxes().then(function (promise) { LoadBoxColors();});
        
        
        /*****event handlers******/
        
        $scope.$on("boxChanged", function (event) {
            if ($scope.isLoading) return;
            LoadBoxColors();

        });


        /*****puplic methods******/
        vm.Reset = function()
        {
            GameDataService.ResetTheGame().then(function (promise) {
                GameDataService.ClearAllBoxes().then(function (promise) { LoadBoxColors(); });
            });

            //GameDataService.ResetTheGame().then(function (promise) {
            //    LoadBoxColors();
            //});
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

        function DoWeHaveWinner(boxData)
        {
            if (boxData[0].value == 1 && boxData[1].value == 1 && boxData[2].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }
            if (boxData[3].value == 1 && boxData[4].value == 1 && boxData[5].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }
            if (boxData[6].value == 1 && boxData[7].value == 1 && boxData[8].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }

            if (boxData[0].value == 1 && boxData[3].value == 1 && boxData[6].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }
            if (boxData[1].value == 1 && boxData[4].value == 1 && boxData[7].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }
            if (boxData[2].value == 1 && boxData[5].value == 1 && boxData[8].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }

            if (boxData[0].value == 1 && boxData[4].value == 1 && boxData[8].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }
            if (boxData[2].value == 1 && boxData[4].value == 1 && boxData[6].value == 1) { vm.ShowWinner = true; vm.winner = "red"; }

            if (boxData[0].value == 2 && boxData[1].value == 2 && boxData[2].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }
            if (boxData[3].value == 2 && boxData[4].value == 2 && boxData[5].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }
            if (boxData[6].value == 2 && boxData[7].value == 2 && boxData[8].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }

            if (boxData[0].value == 2 && boxData[3].value == 2 && boxData[6].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }
            if (boxData[1].value == 2 && boxData[4].value == 2 && boxData[7].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }
            if (boxData[2].value == 2 && boxData[5].value == 2 && boxData[8].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }

            if (boxData[0].value == 2 && boxData[4].value == 2 && boxData[8].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }
            if (boxData[2].value == 2 && boxData[4].value == 2 && boxData[6].value == 2) { vm.ShowWinner = true; vm.winner = "blue"; }
            


        }

        function SetPlayersAndStartTheGame()
        {
            GameDataService.GetGameStatus().then(function (promise) {

                if (promise.value == true) {
                    vm.IsSecondPlayer = true;
                   
                }
                else
                {
                    vm.IsSecondPlayer = false;
                    GameDataService.StartTheGame();
                }
            });
        }
        
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

        function LoadBoxColors()
        {
            GameDataService.GetBoxColors().then(function (promise) {
                var boxData = promise;
                vm.ShowMainPage = true;
                vm.ShowLoading = false;
                PaintBoxes(boxData);
                DoWeHaveWinner(boxData);

            });

        }



    }/*****end of GameController******/

})();
