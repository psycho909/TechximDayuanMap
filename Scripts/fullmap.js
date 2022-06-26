function _initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 25.0623841, lng: 121.1425703 },
		zoom: 12
	});
}
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
	$(this).siblings().removeClass("active");
	$(this).addClass("active");

	$(".layer-content[data-layer='" + layer + "']")
		.siblings()
		.removeClass("on");
	$(".layer-content[data-layer='" + layer + "']").addClass("on");
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
	var obj = {};
	// 空間查詢input的data-search 會變成 obj的key
	// 空間查詢input的value 會變成 obj的value
	input.each(function (i, v) {
		obj[$(v).attr("data-search")] = $(v).val();
	});
	console.log(obj);
});
