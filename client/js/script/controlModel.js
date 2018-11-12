define(function () {
    const OrbitContoller = {
        current: 'orbit',
        level: 1
    };
    const PosController = {
        current: 'position',
        level: 0
    };

    let defaultThreeWidth = 640;
    let defaultThreeHeight = 480;
    let preposition, curposition;
    let controller = PosController;//控制器

    let eventManager;

    /*    //初始化three.js相关环境
        function initThree(width, height, container) {
            // 创建一个场景，它能放置所有元素，如网格对象、摄像机、灯光等
            let scene = new THREE.Scene();
            scene.background = 'transparent';

            // 创建一个摄像机
            //arg1：摄像机能看到的视野，推荐默认值为50
            //arg2：渲染结果的横向尺寸和纵向尺寸的比值
            //arg3：从距离摄像机多近的距离开始渲染，推荐默认值0.1
            //arg4：摄像机从它所处的位置开始能看到多远。若过小，那么场景中的远处不会被渲染，推荐默认值1000

            width = width || defaultThreeWidth;
            height = height || defaultThreeHeight;
            let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

            // 初始化摄像机插件（用于拖拽旋转摄像机，产生交互效果）
            // let orbitControls = new THREE.OrbitControls(camera);

            // 设置摄像机位置，并将其朝向场景中心
            camera.position.x = 0
            camera.position.y = 0
            camera.position.z = 200
            camera.lookAt(scene.position);
            scene.add(camera);

            // 添加环境光，用于提亮场景
            let ambientLight = new THREE.AmbientLight(0x0c0c0c);
            scene.add(ambientLight);

            // 添加聚光灯
            let spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(-40, 60, -10);

            scene.add(spotLight);

            // 创建一个渲染器，并设置其清除颜色和大小
            // var renderer = new THREE.WebGLRenderer({alpha: true});
            var renderer = new THREE.CanvasRenderer({alpha: true});
            // renderer.setClearColor(0xffffff, 1.0);
            renderer.setSize(width, height);

            // 将渲染器的输出（canvas）插入到特定 DOM 元素下
            if (container) {
                container.appendChild(renderer.domElement);
            } else {
                //若没有提供three.js的输出容器，创建一个容器
                let body = document.body;
                container = document.createElement('div');
                container.style.width = width + 'px';
                container.style.height = height + 'px';
                container.style.position = 'absolute';
                container.style.top = '0px';
                container.style.left = '0px';
                container.style.zIndex = 999;
                body.appendChild(container);
                container.appendChild(renderer.domElement);
            }
            render();

            function render() {
                // render using requestAnimationFrame
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }

            let originModel;

            return function (center, model) {
                if (originModel) scene.remove(originModel);

                if (!model) {
                    // 创建一个立方体
                    let cubeGeometry = new THREE.BoxGeometry(40, 40, 40);
                    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
                    originModel = new THREE.Mesh(cubeGeometry, cubeMaterial);
                } else {
                    originModel = model;
                }
                // model = model;
                // 设置立方体的位置
                originModel.position.x = (center.x - width / 2) / 2;
                originModel.position.y = (center.y - height / 2) / 2;
                // cube.position.x = 20;
                // cube.position.y = 10;
                originModel.position.z = 0;
                console.log(originModel.position.x, originModel.position.y, originModel.position.z)

                // 添加虚拟物体至场景
                scene.add(originModel);
            };
        }*/


    var canvas, context, posit;
    var modelSize = 35.0; //millimeters毫米
    var video;


    var renderer1, renderer2, renderer3;
    var scene1, scene2, scene3, scene4;
    var camera1, camera2, camera3, camera4;
    var plane1, plane2, model, texture;
    var step = 0.0;


    function handlePan() {
        console.log('handlePan')
    }

    //构造函数
    THREE.OrbitControls = function (object, domElement) {

        this.object = object;

        this.domElement = (domElement !== undefined) ? domElement : document;

        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the object orbits around（target属性表示物体旋转的中心）
        this.target = new THREE.Vector3();

        // How far you can dolly in and out ( PerspectiveCamera only )（可以移动的位置范围，仅支持透视投影相机）
        this.minDistance = 0;
        this.maxDistance = Infinity;

        // How far you can zoom in and out ( OrthographicCamera only )（可以缩放的方位，仅支持正交投影相机）
        this.minZoom = 0;
        this.maxZoom = Infinity;

        // How far you can orbit（旋转） vertically（垂直地）, upper and lower limits.（可以垂直旋转的范围）
        // Range is 0 to Math.PI radians.（0~π）
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally（水平的）, upper and lower limits.（可以水平旋转的范围）
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = -Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping（抑制） (inertia（惯性）)（enableDamping用于抑制惯性的效果）
        // If damping is enabled, you must call controls.update() in your animation loop（若设置enableDamping为true，需要在动画循环中调用controls.update()更新）
        this.enableDamping = false;
        this.dampingFactor = 0.25;

        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.（enableZoom用于设置是否允许缩放）
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;

        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = false; // if true, pan in screen-space
        this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

        // Set to false to disable use of the keys（是否允许使用键控制）
        this.enableKeys = true;

        // The four arrow keys
        this.keys = {LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40};

        // Mouse buttons
        this.mouseButtons = {LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT};

        // for reset（用于重置？？？？）
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;

        //
        // public methods
        //

        //获取极角
        this.getPolarAngle = function () {

            return spherical.phi;

        };

        //获取方位角
        this.getAzimuthalAngle = function () {

            return spherical.theta;

        };

        //保存状态
        this.saveState = function () {
            //scope指向this，当前构造的对象
            scope.target0.copy(scope.target);
            scope.position0.copy(scope.object.position);
            scope.zoom0 = scope.object.zoom;

        };

        //重置
        this.reset = function () {
            //scope指向this，当前构造的对象
            scope.target.copy(scope.target0);
            scope.object.position.copy(scope.position0);
            scope.object.zoom = scope.zoom0;

            scope.object.updateProjectionMatrix();
            scope.dispatchEvent(changeEvent);

            scope.update();

            state = STATE.NONE;

        };

        // this method is exposed, but perhaps it would be better if we can make it private...（update方法被暴露出来，若是将它设置为私有方法更好）
        this.update = function () {

            var offset = new THREE.Vector3();

            // so camera.up is the orbit axis
            //setFromUnitVectors(vFrom,vTo)：将该四元数设置为由vFrom向量到vTo向量所需要的旋转量
            var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));//由object.up和一个向量生成一个四元数
            var quatInverse = quat.clone().inverse();//求这个四元数的倒数——计算共轭，然后使结果标准化。

            var lastPosition = new THREE.Vector3();
            var lastQuaternion = new THREE.Quaternion();

            return function update() {
                var position = scope.object.position;
                console.log('scope.target:');
                console.log(scope.target);

                //计算物体位置与旋转中心的偏移量，其实就是得出在当前球面坐标系中，相机的位置
                offset.copy(position).sub(scope.target);

                // rotate offset to "y-axis-is-up" space 通过四元数旋转物体。
                offset.applyQuaternion(quat);

                // angle from z-axis around y-axis（从z轴到y轴的角度）基于offset向量设置spherical的radius，phi（与y轴正方向的夹角）和theta（绕y轴旋转的角度）属性
                spherical.setFromVector3(offset);

                //若设置了自动旋转，切虚拟物体无状态，向左旋转
                if (scope.autoRotate && state === STATE.NONE) {

                    rotateLeft(getAutoRotationAngle());

                }

                spherical.theta += sphericalDelta.theta;
                spherical.phi += sphericalDelta.phi;

                // 将theta和phi的值限定在期望范围内
                // restrict theta to be between desired limits
                spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta));

                // restrict phi to be between desired limits
                spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));

                //确保phi值在正常范围内
                spherical.makeSafe();


                //球面坐标系的半径缩放
                spherical.radius *= scale;

                // restrict radius to be between desired limits
                spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));

                // move target to panned location 将中心点移动到平移到的位置
                scope.target.add(panOffset);

                //获取物体在球面坐标中的坐标
                offset.setFromSpherical(spherical);

                // rotate offset back to "camera-up-vector-is-up" space 偏移量旋转回“相机-向上-矢量-向上”空间
                offset.applyQuaternion(quatInverse);

                //重新计算得到物体的当前位置
                position.copy(scope.target).add(offset);

                console.log("updated:")
                console.log(scope.target);

                scope.object.lookAt(scope.target);

                if (scope.enableDamping === true) {

                    sphericalDelta.theta *= (1 - scope.dampingFactor);
                    sphericalDelta.phi *= (1 - scope.dampingFactor);

                    panOffset.multiplyScalar(1 - scope.dampingFactor);

                } else {

                    sphericalDelta.set(0, 0, 0);

                    //平移量清空
                    panOffset.set(0, 0, 0);

                }

                scale = 1;

                // update condition is:
                // min(camera displacement, camera rotation in radians)^2 > EPS
                // using small-angle approximation cos(x/2) = 1 - x^2 / 8

                if (zoomChanged ||
                    lastPosition.distanceToSquared(scope.object.position) > EPS ||
                    8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

                    scope.dispatchEvent(changeEvent);

                    lastPosition.copy(scope.object.position);
                    lastQuaternion.copy(scope.object.quaternion);
                    zoomChanged = false;

                    return true;

                }

                return false;

            };

        }();

        //移除所有事件监听器
        this.dispose = function () {

            scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
            scope.domElement.removeEventListener('mousedown', onMouseDown, false);
            scope.domElement.removeEventListener('wheel', onMouseWheel, false);

            scope.domElement.removeEventListener('touchstart', onTouchStart, false);
            scope.domElement.removeEventListener('touchend', onTouchEnd, false);
            scope.domElement.removeEventListener('touchmove', onTouchMove, false);

            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('mouseup', onMouseUp, false);

            window.removeEventListener('keydown', onKeyDown, false);

            //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

        };

        //
        // internals（内部构件）
        //

        var scope = this;

        var changeEvent = {type: 'change'};
        var startEvent = {type: 'start'};
        var endEvent = {type: 'end'};

        var STATE = {NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4};

        var state = STATE.NONE;

        var EPS = 0.000001;

        // current position in spherical coordinates（在球面坐标中的当前位置）
        var spherical = new THREE.Spherical();//Spherical(radius, phi, theta)：radius默认1.0，以y轴正方向为向上，phi表示与y轴正方向的夹角，theta表示绕y轴旋转的值，默认都为0
        var sphericalDelta = new THREE.Spherical();

        var scale = 1;
        var panOffset = new THREE.Vector3();//平移量{x:0,y:0,z:0}
        var zoomChanged = false;

        var rotateStart = new THREE.Vector2();//{x:0,y:0}
        var rotateEnd = new THREE.Vector2();
        var rotateDelta = new THREE.Vector2();

        var panStart = new THREE.Vector2();
        var panEnd = new THREE.Vector2();
        var panDelta = new THREE.Vector2();

        var dollyStart = new THREE.Vector2();
        var dollyEnd = new THREE.Vector2();
        var dollyDelta = new THREE.Vector2();

        function getAutoRotationAngle() {

            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

        }

        //获取缩放比例，默认缩放比例为1
        function getZoomScale() {

            return Math.pow(0.95, scope.zoomSpeed);

        }

        //向左旋转
        function rotateLeft(angle) {

            sphericalDelta.theta -= angle;

        }

        //向上旋转
        function rotateUp(angle) {

            sphericalDelta.phi -= angle;

        }

        //向左平移
        var panLeft = function () {

            var v = new THREE.Vector3();

            return function panLeft(distance, objectMatrix) {

                v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix（获取物体姿态矩阵的表示X的列）
                v.multiplyScalar(-distance);//向左为负

                panOffset.add(v);

            };

        }();

        //向上平移
        var panUp = function () {

            var v = new THREE.Vector3();

            return function panUp(distance, objectMatrix) {

                if (scope.screenSpacePanning === true) {

                    v.setFromMatrixColumn(objectMatrix, 1);//取出表示Y轴的列

                } else {

                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.crossVectors(scope.object.up, v);

                }

                v.multiplyScalar(distance);

                panOffset.add(v);

            };

        }();

        // deltaX and deltaY are in pixels; right and down are positive（deltaX和deltaY是以像素为单位，向右和向下为正）
        var pan = function () {

            var offset = new THREE.Vector3();

            return function pan(deltaX, deltaY) {

                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                if (scope.object.isPerspectiveCamera) {
                    //对于透视投影相机的处理

                    // perspective
                    var position = scope.object.position;
                    offset.copy(position).sub(scope.target);//计算出偏移量offset
                    var targetDistance = offset.length();

                    // half of the fov is center to top of screen
                    targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);

                    // we use only clientHeight here so aspect ratio does not distort speed（为保证不会长宽比不会扭曲速度，此处使用clientHeight）
                    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
                    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);

                } else if (scope.object.isOrthographicCamera) {
                    //对于正交投影相机的处理
                    // orthographic
                    panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
                    panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);

                } else {

                    // camera neither orthographic nor perspective
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                    scope.enablePan = false;

                }

            };

        }();

        /**
         * 放大，整部摄影机向前移动
         * @param dollyScale 缩放比例
         */
        function dollyIn(dollyScale) {

            if (scope.object.isPerspectiveCamera) {

                scale /= dollyScale;

            } else if (scope.object.isOrthographicCamera) {

                scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
                scope.object.updateProjectionMatrix();
                zoomChanged = true;

            } else {

                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                scope.enableZoom = false;

            }

        }

        /**
         * 缩小，整部摄影机向后移动
         * @param dollyScale 缩放比例
         */
        function dollyOut(dollyScale) {

            if (scope.object.isPerspectiveCamera) {

                scale *= dollyScale;

            } else if (scope.object.isOrthographicCamera) {

                scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
                scope.object.updateProjectionMatrix();
                zoomChanged = true;

            } else {

                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                scope.enableZoom = false;

            }

        }

        //
        // event callbacks - update the object state（回调事件 - 更新虚拟物体的状态）
        //

        //处理鼠标按下旋转事件
        function handleMouseDownRotate(event) {

            //console.log( 'handleMouseDownRotate' );

            //设置旋转的初态
            rotateStart.set(event.clientX, event.clientY);

        }

        function handleMouseDownDolly(event) {

            //console.log( 'handleMouseDownDolly' );

            dollyStart.set(event.clientX, event.clientY);

        }

        function handleMouseDownPan(event) {

            //console.log( 'handleMouseDownPan' );

            panStart.set(event.clientX, event.clientY);

        }

        //处理鼠标按下移动导致的旋转事件
        function handleMouseMoveRotate(event) {

            console.log('handleMouseMoveRotate');

            //设置旋转的终态
            rotateEnd.set(event.clientX, event.clientY);

            //基于初始状态和结束状态，计算差值，再乘上旋转速度，得到旋转量
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);

            var element = scope.domElement === document ? scope.domElement.body : scope.domElement;


            //计算出向左旋转角度和向上旋转角度
            rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

            rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
            console.log("rotate变量：")
            console.log(rotateDelta);
            //以当前的终态作为下次鼠标移动的初态
            rotateStart.copy(rotateEnd);

            //更新虚拟物体状态
            scope.update();

        }

        function handleMouseMoveDolly(event) {

            //console.log( 'handleMouseMoveDolly' );

            dollyEnd.set(event.clientX, event.clientY);

            dollyDelta.subVectors(dollyEnd, dollyStart);

            if (dollyDelta.y > 0) {

                dollyIn(getZoomScale());

            } else if (dollyDelta.y < 0) {

                dollyOut(getZoomScale());

            }

            dollyStart.copy(dollyEnd);

            scope.update();

        }

        function handleMouseMovePan(event) {

            //console.log( 'handleMouseMovePan' );

            panEnd.set(event.clientX, event.clientY);

            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);

            pan(panDelta.x, panDelta.y);

            panStart.copy(panEnd);

            scope.update();

        }

        function handleMouseUp(event) {

            console.log('handleMouseUp');

        }

        function handleMouseWheel(event) {

            // console.log( 'handleMouseWheel' );

            if (event.deltaY < 0) {

                dollyOut(getZoomScale());

            } else if (event.deltaY > 0) {

                dollyIn(getZoomScale());

            }

            scope.update();

        }

        function handleKeyDown(event) {

            //console.log( 'handleKeyDown' );

            switch (event.keyCode) {

                case scope.keys.UP:
                    pan(0, scope.keyPanSpeed);
                    scope.update();
                    break;

                case scope.keys.BOTTOM:
                    pan(0, -scope.keyPanSpeed);
                    scope.update();
                    break;

                case scope.keys.LEFT:
                    pan(scope.keyPanSpeed, 0);
                    scope.update();
                    break;

                case scope.keys.RIGHT:
                    pan(-scope.keyPanSpeed, 0);
                    scope.update();
                    break;

            }

        }

        function handleTouchStartRotate(event) {

            //console.log( 'handleTouchStartRotate' );

            rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);

        }

        function handleTouchStartDollyPan(event) {

            //console.log( 'handleTouchStartDollyPan' );

            if (scope.enableZoom) {

                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;

                var distance = Math.sqrt(dx * dx + dy * dy);

                dollyStart.set(0, distance);

            }

            if (scope.enablePan) {

                var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
                var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

                panStart.set(x, y);

            }

        }

        function handleTouchMoveRotate(event) {

            //console.log( 'handleTouchMoveRotate' );

            rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);

            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);

            var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

            rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);

            rotateStart.copy(rotateEnd);

            scope.update();

        }

        function handleTouchMoveDollyPan(event) {

            //console.log( 'handleTouchMoveDollyPan' );

            if (scope.enableZoom) {

                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;

                var distance = Math.sqrt(dx * dx + dy * dy);

                dollyEnd.set(0, distance);

                dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));

                dollyIn(dollyDelta.y);

                dollyStart.copy(dollyEnd);

            }

            if (scope.enablePan) {

                var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
                var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);

                panEnd.set(x, y);

                panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);

                pan(panDelta.x, panDelta.y);

                panStart.copy(panEnd);

            }

            scope.update();

        }

        function handleTouchEnd(event) {

            //console.log( 'handleTouchEnd' );

        }

        //
        // event handlers - FSM: listen for events and reset state（事件句柄 - 根据不同的事件触发情况添加对应的回调处理函数以及重置状态）
        //

        function onMouseDown(event) {

            if (scope.enabled === false) return;
            controller = OrbitContoller;

            event.preventDefault();

            switch (event.button) {

                case scope.mouseButtons.LEFT://若是按下鼠标左键

                    if (event.ctrlKey || event.metaKey) {//判断是否按下控制平移的按键

                        if (scope.enablePan === false) return;

                        handleMouseDownPan(event);

                        state = STATE.PAN;

                    } else {//发出旋转事件

                        //若不允许旋转，返回。不响应鼠标事件
                        if (scope.enableRotate === false) return;

                        //执行鼠标按下旋转的处理函数
                        handleMouseDownRotate(event);

                        //将状态切换成旋转
                        state = STATE.ROTATE;

                    }

                    break;

                case scope.mouseButtons.MIDDLE://若是按下鼠标滚轮，进入"缩放"处理流程

                    //若不允许缩放，返回
                    if (scope.enableZoom === false) return;

                    //执行鼠标按下缩放的处理函数
                    handleMouseDownDolly(event);

                    //将状态切换成缩放状态
                    state = STATE.DOLLY;

                    break;

                case scope.mouseButtons.RIGHT://若是按下鼠标右键

                    //若不允许平移，返回
                    if (scope.enablePan === false) return;

                    //执行鼠标按下平移的处理函数
                    handleMouseDownPan(event);

                    //将状态切换成平移状态
                    state = STATE.PAN;

                    break;

            }

            if (state !== STATE.NONE) {//若存在一种状态，继续监听鼠标的移动以及抬起

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                //触发startEvent事件
                scope.dispatchEvent(startEvent);

            }

        }

        //鼠标移动处理事件
        function onMouseMove(event) {

            if (scope.enabled === false) return;

            event.preventDefault();


            switch (state) {

                case STATE.ROTATE:

                    if (scope.enableRotate === false) return;

                    handleMouseMoveRotate(event);
                    break;

                case STATE.DOLLY:

                    if (scope.enableZoom === false) return;

                    handleMouseMoveDolly(event);
                    break;

                case STATE.PAN:

                    if (scope.enablePan === false) return;

                    handleMouseMovePan(event);
                    break;

            }

        }

        function onMouseUp(event) {

            if (scope.enabled === false) return;
            controller = PosController;
            handleMouseUp(event);

            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('mouseup', onMouseUp, false);

            scope.dispatchEvent(endEvent);

            state = STATE.NONE;


        }

        function onMouseWheel(event) {

            if (scope.enabled === false || scope.enableZoom === false || (state !== STATE.NONE && state !== STATE.ROTATE)) return;

            event.preventDefault();
            event.stopPropagation();

            scope.dispatchEvent(startEvent);

            handleMouseWheel(event);

            scope.dispatchEvent(endEvent);

        }

        function onKeyDown(event) {

            if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;

            handleKeyDown(event);

        }

        function onTouchStart(event) {

            if (scope.enabled === false) return;

            event.preventDefault();

            switch (event.touches.length) {

                case 1:	// one-fingered touch: rotate

                    if (scope.enableRotate === false) return;

                    handleTouchStartRotate(event);

                    state = STATE.TOUCH_ROTATE;

                    break;

                case 2:	// two-fingered touch: dolly-pan

                    if (scope.enableZoom === false && scope.enablePan === false) return;

                    handleTouchStartDollyPan(event);

                    state = STATE.TOUCH_DOLLY_PAN;

                    break;

                default:

                    state = STATE.NONE;

            }

            if (state !== STATE.NONE) {

                scope.dispatchEvent(startEvent);

            }

            controller = OrbitContoller;

        }

        function onTouchMove(event) {

            if (scope.enabled === false) return;

            event.preventDefault();
            event.stopPropagation();

            switch (event.touches.length) {

                case 1: // one-fingered touch: rotate

                    if (scope.enableRotate === false) return;
                    if (state !== STATE.TOUCH_ROTATE) return; // is this needed?

                    handleTouchMoveRotate(event);

                    break;

                case 2: // two-fingered touch: dolly-pan

                    if (scope.enableZoom === false && scope.enablePan === false) return;
                    if (state !== STATE.TOUCH_DOLLY_PAN) return; // is this needed?

                    handleTouchMoveDollyPan(event);

                    break;

                default:

                    state = STATE.NONE;

            }

        }

        function onTouchEnd(event) {

            if (scope.enabled === false) return;

            handleTouchEnd(event);

            scope.dispatchEvent(endEvent);

            state = STATE.NONE;

            controller = PosController;

        }

        function onContextMenu(event) {

            if (scope.enabled === false) return;

            event.preventDefault();

        }

        this.listen = function () {

        };

        //添加事件监听器

        scope.domElement.addEventListener('contextmenu', onContextMenu, false);

        scope.domElement.addEventListener('mousedown', onMouseDown, false);
        scope.domElement.addEventListener('wheel', onMouseWheel, false);

        scope.domElement.addEventListener('touchstart', onTouchStart, false);
        scope.domElement.addEventListener('touchend', onTouchEnd, false);
        scope.domElement.addEventListener('touchmove', onTouchMove, false);

        window.addEventListener('keydown', onKeyDown, false);

        // force an update at start（在刚开始时强制更新）

        this.update();

    };

//覆写原型
    THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
//修改原型的构造函数指向为指向自身
    THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

//给原型添加某些属性
    Object.defineProperties(THREE.OrbitControls.prototype, {

        center: {
            get: function () {

                console.warn('THREE.OrbitControls: .center has been renamed to .target');
                return this.target;

            }

        },

        // backward compatibility

        noZoom: {

            get: function () {

                console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
                return !this.enableZoom;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
                this.enableZoom = !value;

            }

        },

        noRotate: {

            get: function () {

                console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
                return !this.enableRotate;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
                this.enableRotate = !value;

            }

        },

        noPan: {

            get: function () {

                console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
                return !this.enablePan;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
                this.enablePan = !value;

            }

        },

        noKeys: {

            get: function () {

                console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
                return !this.enableKeys;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
                this.enableKeys = !value;

            }

        },

        staticMoving: {

            get: function () {

                console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
                return !this.enableDamping;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
                this.enableDamping = !value;

            }

        },

        dynamicDampingFactor: {

            get: function () {

                console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
                return this.dampingFactor;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
                this.dampingFactor = value;

            }

        }

    });


    //绘制marker的轮廓和marker的左上角
    function drawCorners(markers) {
        var corners, corner, i, j;

        context.lineWidth = 3;

        for (i = 0; i < markers.length; ++i) {
            corners = markers[i].corners;

            context.strokeStyle = "red";
            context.beginPath();

            for (j = 0; j < corners.length; ++j) {
                corner = corners[j];
                context.moveTo(corner.x, corner.y);
                corner = corners[(j + 1) % corners.length];
                context.lineTo(corner.x, corner.y);
            }

            context.stroke();
            context.closePath();

            context.strokeStyle = "green";
            context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
        }
    };

    //创建渲染器和场景
    function createRenderers() {
        /*        //渲染器1：使用透视投影相机
                renderer1 = new THREE.WebGLRenderer();
                renderer1.setClearColor(0xffff00, 1);
                renderer1.setSize(canvas.width, canvas.height);
                document.getElementById("container1").appendChild(renderer1.domElement);
                scene1 = new THREE.Scene();
                camera1 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
                scene1.add(camera1);*/


        /*        //渲染器2：使用透视投影相机
                renderer2 = new THREE.WebGLRenderer();
                renderer2.setClearColor(0xffff00, 1);
                renderer2.setSize(canvas.width, canvas.height);
                document.getElementById("container2").appendChild(renderer2.domElement);
                scene2 = new THREE.Scene();
                camera2 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
                scene2.add(camera2);*/

        //渲染器3：
        renderer3 = new THREE.WebGLRenderer();
        renderer3.setClearColor(0xffffff, 1);
        renderer3.setSize(canvas.width, canvas.height);
        document.getElementById("three-container").appendChild(renderer3.domElement);

        //使用正交投影相机
        scene3 = new THREE.Scene();
        camera3 = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5);
        scene3.add(camera3);

        //使用透视投影相机
        scene4 = new THREE.Scene();
        camera4 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
        scene4.add(camera4);

        let orbitControl = new THREE.OrbitControls(camera4);

    };

    function render() {
        /*renderer1.clear();
        renderer1.render(scene1, camera1);

        renderer2.clear();
        renderer2.render(scene2, camera2);*/

        //放置两个场景
        renderer3.autoClear = false;
        renderer3.clear();
        renderer3.render(scene3, camera3);
        renderer3.render(scene4, camera4);
    };

    //向场景中添加内容
    function createScenes() {
        /* //左下角
         plane1 = createPlane();
         scene1.add(plane1);

         //右下角
         plane2 = createPlane();
         scene2.add(plane2);*/

        //右上角 场景3添加纹理，实际添加的是以当前视频流为纹理的对象
        texture = createTexture();
        scene3.add(texture);

        //右上角 场景4添加模型，实际添加以地图图像为贴图的球体
        model = createModel();
        scene4.add(model);
    };

    //创建平面
    function createPlane() {
        var object = new THREE.Object3D(),
            geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
            material = new THREE.MeshNormalMaterial(),
            mesh = new THREE.Mesh(geometry, material);

        object.eulerOrder = 'YXZ';

        object.add(mesh);

        return object;
    };

    //创建纹理，以视频流为颜色映射对象
    function createTexture() {
        //THREE.Texture():创建一个纹理应用到一个表面或作为反射或折射贴图
        var texture = new THREE.Texture(video),
            object = new THREE.Object3D(),
            geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
            //map:颜色映射，默认为空
            material = new THREE.MeshBasicMaterial({map: texture, depthTest: false, depthWrite: false}),
            mesh = new THREE.Mesh(geometry, material);

        object.position.z = -1;

        object.add(mesh);

        return object;
    };

    //创建模型
    function createModel() {
        var object = new THREE.Object3D(),
            geometry = new THREE.SphereGeometry(0.5, 15, 15, Math.PI),
            texture = THREE.ImageUtils.loadTexture("./js/textures/earth.jpg"),
            material = new THREE.MeshBasicMaterial({map: texture}),
            mesh = new THREE.Mesh(geometry, material);

        object.add(mesh);

        return object;
    };

    //更新场景，根据marker的四个角点的位置放置虚拟物体
    function updateScenes(/*markers*/) {
        texture.children[0].material.map.needsUpdate = true;
    };

    function updateModel(markers) {
        var corners, corner, pose, i;

        if (controller.current === 'position' && markers.length > 0) {
            corners = markers[0].corners;

            for (i = 0; i < corners.length; ++i) {
                corner = corners[i];

                corner.x = corner.x - (canvas.width / 2);
                corner.y = (canvas.height / 2) - corner.y;
            }

            // console.log(corners);//Array4 [{x:-1,y:2},{x:-1,y:2},{x:-1,y:2},{x:-1,y:2}]
            pose = posit.pose(corners);


            // updateObject(plane1, pose.bestRotation, pose.bestTranslation);
            // updateObject(plane2, pose.alternativeRotation, pose.alternativeTranslation);
            updateObject(model, pose.bestRotation, pose.bestTranslation);

            // updatePose("pose1", pose.bestError, pose.bestRotation, pose.bestTranslation);
            // updatePose("pose2", pose.alternativeError, pose.alternativeRotation, pose.alternativeTranslation);

            step += 0.025;

            model.rotation.z -= step;
        }
    }

    function updateObject(object, rotation, translation) {
        object.scale.x = modelSize;
        object.scale.y = modelSize;
        object.scale.z = modelSize;

        object.rotation.x = -Math.asin(-rotation[1][2]);
        object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
        object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

        object.position.x = translation[0];
        object.position.y = translation[1];
        object.position.z = -translation[2];
    };

    function onload(srcvideo, manager) {
        eventManager = manager;
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        canvas.width = defaultThreeWidth;
        canvas.height = defaultThreeHeight;
        //初始化定位方法，参数：模型大小，焦距
        posit = new POS.Posit(modelSize, canvas.width);
        video = srcvideo;
        // 初始化摄像机插件（用于拖拽旋转摄像机，产生交互效果）

        //添加事件
        // eventManager.listen('pan', handlePan);

        createRenderers();
        createScenes();

        tick();
    }

    /*
        function updateModel(target) {

            let marker = [{corners: target}];
            //告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。
            requestAnimationFrame(function () {
                drawCorners(marker);
                updateScenes(marker);
                render();
            });
        }*/


    function updatePosition(position) {
        curposition = position;
        console.log(position);
    }


    function tick() {
        //告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画
        requestAnimationFrame(tick);

        console.log("当前controller是PosController？" + controller === PosController);

        updateScenes();


        if (curposition && preposition !== curposition) {
            let markers = [{corners: curposition}];
            // drawCorners(markers);
            // updateScenes(markers);
            updateModel(markers);
            // render();
            preposition = curposition;
        }

        render();
    };

    return {
        onload: onload,
        // init: initThree,
        locateModel: updatePosition,
    }
});