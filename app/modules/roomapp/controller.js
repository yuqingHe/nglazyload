"use strict";

define([
    "ionic",
], function () {
    return angular.module("room.Controller", [
        "ionic",
    ]).controller('roomController', function ($scope, $sce) {

        $scope.hello = "heldddo";
        $scope.texturl = "";
        $scope.text = $sce.trustAsHtml($scope.texturl);


        $scope.array = [];
        for(var i=0;i<100;i++){
            $scope.array.push(i);
        }

        $scope.imgurl = "http://qacdn.1course.cn/xbshow/Activity/20160701224721-88603";

        $scope.drag = function () {
            var dragable = event.target;
            dragable.style.left = dragable.pageX - 0
        }

        $scope.scroll = function(){
            console.log("dd")
        }

        $scope.toggle = function(){
            $scope.ifShow = !$scope.ifShow;
        }
        

    }).directive('box3', function ($ionicGesture) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                
                $scope.$on('focus', function (e) {
                    console.log("dd");
                    
                });
            }
        }
    }).directive('box2', function ($ionicGesture) {
        return {
            restrict: 'C',
            link: function ($scope, $element, $attr) {
                var output = angular.element(document.getElementById('output'));

                var o = function (type, d) {
                    var p = ['' + type + ' event: '];
                    for (var i = 0; i < d.length; i++) {
                        p.push(d[i]);
                    }
                    p.push('');
                    output.append(p.join(', '));
                    $element[0].scrollTop = $element[0].scrollHeight;
                };
                var dragFn = function (e) {
                    //if(e.gesture.direction=="right"&&e.gesture.touches[0].pageX>=parseInt(e.target.offsetWidth/2)&&e.gesture.touches[0].pageX<=parseInt(e.target.parentNode.offsetWidth)-parseInt(e.target.offsetWidth/2)){
                    // e.target.style.left = e.gesture.deltaX  + "px";
                    // console.log(e.target.style.left);

                    //    curX = touch.pageX - this.offsetLeft - 73;
                    //     if(curX <= 0) return;
                    //     if(curX > 550){
                    //         $('#well').fadeOut();
                    //     }
                    var curX = e.gesture.touches[0].pageX - e.target.offsetLeft - 55;
                    var maxwidth = parseInt(e.target.parentNode.offsetWidth)-parseInt(e.target.offsetWidth)
                    if (curX <= 0) return;
                    if (curX > maxwidth) {
                        return;
                        //$('#well').fadeOut();
                    }
                    e.target.style.webkitTransform = 'translateX(' + curX + 'px)';
                    //}
                    console.log(e.target.offsetLeft);
                    console.log(e.gesture.deltaX);
                    console.log(e.gesture.direction);
                    //o('drag', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.deltaX, e.gesture.deltaY]);
                };
                var dragGesture = $ionicGesture.on('drag', dragFn, $element);
                $scope.$on('$destroy', function () {
                    $ionicGesture.off(dragGesture, 'drag', dragFn);
                });

            }
        }
    }).directive('box', function ($ionicGesture) {
        return {
            restrict: 'C',
            link: function ($scope, $element, $attr) {
                var output = angular.element(document.getElementById('output'));

                // Debug output function
                var o = function (type, d) {
                    var p = ['' + type + ' event: '];
                    for (var i = 0; i < d.length; i++) {
                        p.push(d[i]);
                    }
                    p.push('');
                    output.append(p.join(', '));
                    $element[0].scrollTop = $element[0].scrollHeight;
                };

                $scope.$on('click', function (e) {
                    o('click', []);
                });

                var tapFn = function (e) {
                    o('tap', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY]);
                };
                var tapGesture = $ionicGesture.on('tap', tapFn, $element);

                var releaseFn = function (e) {
                    o('release', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY]);
                };
                var releaseGesture = $ionicGesture.on('release', releaseFn, $element);

                var holdFn = function (e) {
                    o('hold', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY]);
                };
                var holdGesture = $ionicGesture.on('hold', holdFn, $element);

                var dragFn = function (e) {
                    o('drag', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.deltaX, e.gesture.deltaY]);
                };
                var dragGesture = $ionicGesture.on('drag', dragFn, $element);

                var swipeFn = function (e) {
                    o('swipe', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.direction]);
                };
                var swipeGesture = $ionicGesture.on('swipe', swipeFn, $element);

                var transformFn = function (e) {
                    o('transform', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.direction]);
                };
                var transformGesture = $ionicGesture.on('transform', transformFn, $element);

                $scope.$on('$destroy', function () {
                    $ionicGesture.off(dragGesture, 'drag', dragFn);
                    $ionicGesture.off(holdGesture, 'hold', holdFn);
                    $ionicGesture.off(releaseGesture, 'release', releaseFn);
                    $ionicGesture.off(swipeGesture, 'swipe', swipeFn);
                    $ionicGesture.off(tapGesture, 'tap', tapFn);
                    $ionicGesture.off(transformGesture, 'transform', transformFn);
                });
            }
        };
    });

});


	// $("#slider").draggable({
	// 	axis: 'x',
	// 	containment: 'parent',
	// 	drag: function(event, ui) {
	// 		if (ui.position.left > 550) {
	// 			$("#well").fadeOut();
	// 		} else {
	// 		    // Apparently Safari isn't allowing partial opacity on text with background clip? Not sure.
	// 			// $("h2 span").css("opacity", 100 - (ui.position.left / 5))
	// 		}
	// 	},
	// 	stop: function(event, ui) {
	// 		if (ui.position.left < 551) {
	// 			$(this).animate({
	// 				left: 0
	// 			})
	// 		}
	// 	}
	// });

	// // The following credit: http://www.evanblack.com/blog/touch-slide-to-unlock/

	// $('#slider')[0].addEventListener('touchmove', function(event) {
	//     event.preventDefault();
	//     var el = event.target;
	//     var touch = event.touches[0];
	//     curX = touch.pageX - this.offsetLeft - 73;
	//     if(curX <= 0) return;
	//     if(curX > 550){
	//     	$('#well').fadeOut();
	//     }
	//    	el.style.webkitTransform = 'translateX(' + curX + 'px)'; 
	// }, false);

	// $('#slider')[0].addEventListener('touchend', function(event) {	
	//     this.style.webkitTransition = '-webkit-transform 0.3s ease-in';
	//     this.addEventListener( 'webkitTransitionEnd', function( event ) { this.style.webkitTransition = 'none'; }, false );
	//     this.style.webkitTransform = 'translateX(0px)';
	// }, false);