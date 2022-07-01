function _initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 25.0623841, lng: 121.1425703 },
		zoom: 12,
		disableDefaultUI: true
	});
}
let map = null;

// 隱藏滾動軸
if (!isMobile.any) {
	$(".control-content").mCustomScrollbar();
}

// 圖層控制顯示隱藏
$(".control-toggle").on("click", function () {
	$(".control").toggle();
});

// 圖層 / 查詢切換
$(".control-tab__li").on("click", function () {
	var content = $(this).attr("data-content");
	if (content == "layer") {
		$(".control").addClass("layer").removeClass("search");
	}
	if (content == "search") {
		$(".control").addClass("search").removeClass("layer");
	}
	$(this).siblings().removeClass("active");
	$(this).addClass("active");

	$(".content-box[data-content='" + content + "']")
		.siblings()
		.removeClass("on");
	$(".content-box[data-content='" + content + "']").addClass("on");
});

// 圖層切換
$(".layer-li").on("click", function () {
	var layer = $(this).attr("data-layer");
	if (layer) {
		$(this).siblings().removeClass("active");
		$(this).addClass("active");

		$(".layer-content[data-layer='" + layer + "']")
			.siblings()
			.removeClass("on");
		$(".layer-content[data-layer='" + layer + "']").addClass("on");
	}
});

// 查詢切換
$(".search-li").on("click", function () {
	var search = $(this).attr("data-search");
	$(this).siblings().removeClass("active");
	$(this).addClass("active");

	$(".search-content[data-search='" + search + "']")
		.siblings()
		.removeClass("on");
	$(".search-content[data-search='" + search + "']").addClass("on");
});

// 所有圖層開關點擊時
$(".layer-checkbox__input").on("change", function () {
	// 獲取title
	var layerTitle = $(this).attr("data-title");
	// true/false
	var check = $(this).prop("checked");
});

// 雨水下水道圖資/道路纜線圖資 展開按鈕
$(".layer-collapse__toggle").on("click", function () {
	var collapse = $(this).attr("data-collapse");
	$(this).toggleClass("on");
	if ($(".layer-collapse__content[data-collapse='" + collapse + "']").hasClass("on")) {
		$(".layer-collapse__content[data-collapse='" + collapse + "']").removeClass("on");
	} else {
		$(".layer-collapse__content[data-collapse='" + collapse + "']").addClass("on");
	}
});
// 雨水下水道圖資切換全部
$(".rain-checkbox__all").on("change", function () {
	var check = $(this).prop("checked");
	var obj = {};
	$(".rain-checkbox").each(function (i, v) {
		$(v).prop("checked", check);
		obj[$(v).attr("data-title")] = check;
	});
	console.log(obj);
});

// 道路纜線圖資切換全部
$(".road-checkbox__all").on("change", function () {
	var check = $(this).prop("checked");
	$(".road-checkbox").each(function (i, v) {
		$(v).prop("checked", check);
		obj[$(v).attr("data-title")] = check;
	});
});

// 空間查詢
$(".search-btn").on("click", function () {
	var input = $(this).parent(".search-content").find(".search-input");
	var select = $(this).parent(".search-content").find(".search-select");
	var obj = {};
	// 空間查詢input的data-search 會變成 obj的key
	// 空間查詢input的value 會變成 obj的value
	input.each(function (i, v) {
		obj[$(v).attr("data-search")] = $(v).val();
	});
	if (select) {
		obj[$(select).attr("data-select")] = $(select).val();
	}

	console.log(obj);
});

// 地圖切換
$(".map-btn__type").on("click", function () {
	var type = $(this).attr("data-type");
	$(".map-btn__type").not($(this)).removeClass("on");
	$(this).addClass("on");
	if (type == "basic") {
		map.setMapTypeId("roadmap");
	}
	if (type == "satellite") {
		map.setMapTypeId("hybrid");
	}
});

// 選單開啟
$(".menu-open").on("click", function () {
	$(".menu").addClass("show");
});
// 選單關閉
$(".menu-close").on("click", function () {
	$(".menu").removeClass("show");
});

// popup 取消
$(".popup-btn__cancel").on("click", function () {
	$(".popup-input__control").val("");
	$(".popup-select").val(-1);
	$(".popup-checkbox__control").each(function (i, v) {
		$(v).prop("checked", false);
	});
	$(".popup").removeClass("show");
});
// popup 關閉
$(".popup-close").on("click", function () {
	$(".popup-input__control").val("");
	$(".popup-select").val(-1);
	$(".popup-checkbox__control").each(function (i, v) {
		$(v).prop("checked", false);
	});
	$(".popup").removeClass("show");
});
// popup 關閉
$(document).on("mouseup", function (e) {
	var container = $(".popup-wrap");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		$(".popup").removeClass("show");
	}
});

// 切換登入/登出文字狀態
function toggleLoginText() {
	// 登入 / 登出
	if ($(".login-status").attr("data-status") == "login") {
		$(".login-status").attr("data-status", "logout");
		$(".login-status").find(".menu-li__text").text("登出");
	} else {
		$(".login-status").attr("data-status", "login");
		$(".login-status").find(".menu-li__text").text("登入");
	}
}

// 登入按鈕跳窗
$(".login-status").on("click", function () {
	// 登入 / 登出
	if ($(".login-status").attr("data-status") == "login") {
		$(".popup").removeClass("show");
		$(".popup.login").addClass("show");
	}
	// 登入成功切換文字
	toggleLoginText();
});

// 註冊按鈕跳窗
$(".login-btn__reg").on("click", function () {
	$(".popup").removeClass("show");
	$(".popup.reg").addClass("show");
	$(".popup-select").html("");
	var obj = [
		{ value: "a", text: "A" },
		{ value: "b", text: "B" },
		{ value: "c", text: "C" }
	];
	// 塞入申請單位
	insertOption(obj);
});

// 忘記密碼按鈕跳窗
$(".login-btn__forget").on("click", function () {
	$(".popup").removeClass("show");
	$(".popup.forget").addClass("show");
});

// 塞入申請單位
function insertOption(obj) {
	var options = `<option class="popup-option" value="-1">輸入申請單位</option>`;
	$(".popup-select").html("");
	for (var i = 0; i < obj.length; i++) {
		options += `<option class="popup-option" value="${obj[i].value}">${obj[i].text}</option>`;
	}
	$(".popup-select").html(options);
}
