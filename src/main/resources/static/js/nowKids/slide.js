// JSON 가져온 값


/* 프로필 불러오기 */
function getProfileImg(selector) {
    $(selector).each(function () {
        let profilePath = $(this).data('member-profile-path');
        let profileUUID = $(this).data('member-profile-uuid');
        let profileFileOriginalName = $(this).data('member-profile-original-name');
        let profileURL = '/nowKidFiles/display?fileName=NowKids/' + profilePath + '/' + profileUUID + '_' + profileFileOriginalName;

        // 데이터를 변수에 저장
        $(this).css('background-image', 'url(' + profileURL + ')');
    });
}

/* 프로필 이미지 불러오기 끝 */

// 내가 받은 calendar를 한국어로 바꾸는 코드
function convertDate(eventDate) {
    let dateObj = new Date(eventDate);
    let convertedDate = dateObj.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    return convertedDate;
}

/* N시간전 구하는 코드 */
function getTimeAgo(pastTime) {
    let currentTime = new Date();
    let diff = Math.abs(currentTime - new Date(pastTime));
    let minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) {
        return "방금 전";
    } else if (minutes < 60) {
        return minutes + "분 전";
    } else {
        let hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return hours + "시간 전";
        } else {
            let days = Math.floor(hours / 24);
            if (days < 7) {
                return days + "일 전";
            } else {
                let weeks = Math.floor(days / 7);
                return weeks + "주 전";
            }
        }
    }
}

/* 글쓰러가기 나타나게 하기 */
$(window).scroll(function () {
    var topContentOffset = $('.top-content-flex-wrapper').offset().top;
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= topContentOffset) {
        $('.go-write-wrapper').css('display', 'flex');
    } else {
        $('.go-write-wrapper').css('display', 'none');
    }
});

/* 글쓰러가기 나타나게 하기 끝 */

/* 위에 프로필 최신순 */

members.forEach((e, i) => {
    let profilesText =
        `
                <div class="user-info-wrap" onclick="location.href='/member/details/${e.id}'">
                                <span class="top-content-new-img" ></span>
                                <div class="user-img-wrap">
                                    <span class="top-content-user-img"></span>
                                </div>
                                <div class="top-content-user-name">
                                    ${e.memberNickname}
                                </div>
                            </div>

    `;
    $(".top-content-inner-flex").append(profilesText)
})








const $banner = $('.banner');
const width = 344;

var bannerImage1 = [
    '../../static/images/nowKids/001.jpg',
    '../../static/images/nowKids/002.jpg',
    '../../static/images/nowKids/003.jpg',
    '../../static/images/nowKids/004.jpg',
    '../../static/images/nowKids/005.jpg',
];

var bannerImage2 = [
    'https://cdn.class101.net/images/d125bc77-a03a-41fb-9ea6-b04db24f3aff/2048xauto.webp',
    '../../static/images/nowKids/002.jpg',
    '../../static/images/nowKids/003.jpg',
    '../../static/images/nowKids/004.jpg',
    '../../static/images/nowKids/005.jpg',
    '../../static/images/nowKids/001.jpg',
];

let imageList = [bannerImage1, bannerImage2];

let page = 1;
const boardService = (() => {

    function getList(callback) {
        console.log("현재페이지: " + page);
        $.ajax({
            url: `/nowKid/getList?pageNumber=${page}`,
            type: 'post',
            data: JSON.stringify({ page: page }),
            contentType: "application/json;charset=utf-8",
            success: function (nowKidsDTOSAjax) {
                if (nowKidsDTOSAjax == '') {
                    console.log("막힘");
                    $(window).off('scroll');
                    return;
                }
                if (callback) {
                    let nowKidsDTOList = JSON.parse(nowKidsDTOSAjax);
                    callback(nowKidsDTOList);
                }
            }
        });
    }

    return { getList: getList };
})();

function isRecentPost(eventTime) {
    const timeDiff = new Date() - eventTime;
    const hours = timeDiff / (1000 * 60 * 60);
    return hours > 24;
}


let recentTag = '';
function appendList(nowKidsDTOS) {
    console.log(nowKidsDTOS)

    nowKidsDTOS.forEach((e, i) => {
        // console.log(isRecentPost(e.eventUpdateTime));
        // if(!isRecentPost(e.eventUpdateTime)){
        //     recentTag = `<span class="feed-header-new-img">`;
        // } else{
        //     recentTag = '';
        // }

        let kidText = '';
        let text = '';
        text += `
                <div class="bottom-content-flex" id ="${e.nowKidsId}">
                    <section class="feed-header-full-wrap">
                        <div class="modify-delete">
                            <button type="button">수정하기</button>
                            <button type="button">삭제하기</button>
                        </div>
                        <div class="feed-header-inner-flex">
                            <div class="feed-header-left-flex">
                                <a class="feed-header-user-img-wrap" onclick="location.href='/member/details/${e.memberId}'">
                                <span class="feed-header-new-img">
                                    <span class="feed-header-user-img"
                                    data-member-profile-path="${e.memberProfilePath}" 
                                    data-member-profile-uuid="${e.memberProfileUUID}"
                                    data-member-profile-original-name="${e.memberProfileOriginalName}">
                                    </span>
                                </a>
                                <div class="feed-header-new-board">
                                    <em class="feed-header-user-name">
                                        ${e.memberNickname}
                                    </em>
                                </div>
                            </div>
                            <span class="feed-header-time">${getTimeAgo(e.eventUpdateTime)}</span>
                        </div>
                    </section>
                    <div class=title-like-wrap>
                        <button type="button" class="wish-button" aria-pressed="${e.isLiked}" nowKidsId="${e.nowKidsId}" eventId="${e.eventId}">
                            <svg viewBox="0 0 32 32" focusable="false" role="presentation" class="wish-button-svg" aria-hidden="true">
                                <path d="M22.16 4h-.007a8.142 8.142 0 0 0-6.145 2.79A8.198 8.198 0 0 0 9.76 3.998a7.36 7.36 0 0 0-7.359 7.446c0 5.116 4.64 9.276 11.6 15.596l2 1.76 2-1.76c6.96-6.32 11.6-10.48 11.6-15.6v-.08A7.36 7.36 0 0 0 22.241 4h-.085z"></path>
                            </svg>
                        </button>
                        <span class="bottom-event-title">${e.boardTitle}</span>
                    </div>

                    <div class="board-component-image-wrapper">
                        <section class="banner-container">
                            <!-- 메인 배너 -->
                            <div class="banner" id="banner${e.nowKidsId}">
                            /* 이미지가 없으면 이 이미지아래로 이미지 태그 전부를 if로 감싸야한다. */
                            <div>
                                  <img src="/nowKidsFiles/display?fileName=NowKids/${e.files[e.files.length - 1].filePath}/${e.files[e.files.length - 1].fileUUID}_${e.files[e.files.length - 1].fileOriginalName}">
                            </div>
    
    `;
        e.files.forEach((image, j) => {
            let totalWidth = width * (image.length);
            $($banner[j]).css('width', `${totalWidth}px`);
            text += `
                    <div>
                       <img src="/nowKidsFiles/display?fileName=NowKids/${image.filePath}/${image.fileUUID}_${image.fileOriginalName}">
                    </div>
        `;
        });

        e.kids.forEach((kid, k) => {
            kidText += `
            <!-- 하나의 데이터 -->
                        <tr>  
                            <td>${k}</td>
                            <td>${kid.kidName}</td>
                            <td>${kid.kidAge}</td>
                            <td>${e.memberNickname}</td>
                            <td>${convertDate(e.eventStartDate)}</td>  
                        </tr>   
                    `;

        });

        text += `

                <div>
                    <img src="/nowKidsFiles/display?fileName=NowKids/${e.files[0].filePath}/${e.files[0].fileUUID}_${e.files[0].fileOriginalName}">
                </div>
            </div>
            <div class="move-arrow">
                <!-- 이전 버튼 -->
                <div class="prev" id="prev${e.nowKidsId}">
                    <img data-role="none" class="prev-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E" style="display: block;">
                </div>
                <!-- 다음 버튼 -->
                <div class="next" id="next${e.nowKidsId}">
                    <img data-role="none" class="prev-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E" style="display: block;">
                </div>
            </div>
        </section>
        </div>
        <section class="bottom-full-wrap">
            <section class="bottom-event-title-wrap">
            참여인원 보기
                <button type="button" id="table${e.nowKidsId}" class="table-button">
                    <span>
                        <svg viewBox="0 0 32 32" focusable="false" role="presentation" class="nav-arrow-icon${e.nowKidsId}" aria-hidden="true" style="width: 18px; height: 20px; margin-left: 5px;">
                            <path d="M16 22.4L5.6 12l1.12-1.12L16 20.16l9.28-9.28L26.4 12 16 22.4z"></path>
                        </svg>
                    </span>
                </button>
            </section>
            <div class="table-display${e.nowKidsId}">
            <div class="table-kids-count">${e.kids[0].kidName}<span>&nbsp;외&nbsp;</span><span>${e.kids.length - 1}</span>명</div>
                <table class="table-box">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>이름</th>
                            <th>나이</th>                                
                            <th>통솔자 이름</th>                                
                            <th>참여일자</th>    
                        </tr>
                    </thead>
                    <tbody>
                        ${kidText}
                    </tbody>
                </table>
            </div>
        </section>
        <div class="bottom-space"></div>
        </div>
    `;
        $imageWrap.append(text);
    });
}
// 페이지 로딩 시 초기 리스트를 불러옴
boardService.getList(function(nowDTOS) {
    appendList(nowDTOS);
    $('.wish-button').on('click', function () {
        handleLikeButtonClick(this);
        console.log("좋아요 눌림 !");
    });
});

$(window).on('scroll', function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        console.log("스크롤");
        page++;
        console.log(page);
        boardService.getList(function(nowKidsDTOList) {
            appendList(nowKidsDTOList);
            bindLikeButtonClickEvent(); // 좋아요 버튼 이벤트 핸들러를 다시 바인딩
            // getProfileImg('.feed-header-user-img');
        });
    }
});
// getProfileImg('.feed-header-user-img');
// 좋아요 버튼 이벤트 핸들러 바인딩 함수
function bindLikeButtonClickEvent() {
    $('.wish-button').off('click').on('click', function () {
        handleLikeButtonClick(this);
        console.log("좋아요 눌림 !");
    });
}

// 초기 로드 시 좋아요 버튼 이벤트 핸들러 바인딩
bindLikeButtonClickEvent();



const $imageWrap = $('.bottom-content-full-flex');



let checkArrow = false;

$imageWrap.on('click', 'div.prev', (e) => {
    if (checkArrow) {
        return;
    }
    checkArrow = true;

    let i = e.currentTarget.id.replace('prev', '');
    let bannerId = '#banner' + i;
    let $banner = $(bannerId);
    let currentPos = parseInt($banner.css('transform').split(',')[4]);

    $banner.css('transition', 'transform 0.3s');
    $banner.css('transform', `translate(${currentPos + width}px)`);

    if (currentPos == -width) {
        setTimeout(function () {
            $banner.css('transition', 'transform 0s');
            $banner.css('transform', `translate(-${width * ($banner.children().length - 2)}px)`);
        }, 300);
    }
    setTimeout(() => {
        checkArrow = false;
    }, 300);
});

$imageWrap.on('click', 'div.next', (e) => {
    if (checkArrow) {
        return;
    }
    checkArrow = true;

    let i = e.currentTarget.id.replace('next', '');
    let bannerId = '#banner' + i;
    let $banner = $(bannerId);
    let currentPos = parseInt($banner.css('transform').split(',')[4]);

    $banner.css('transition', 'transform 0.3s');
    $banner.css('transform', `translate(${currentPos - width}px)`);

    if (currentPos == -width * ($banner.children().length - 2)) {
        setTimeout(function () {
            $banner.css('transition', 'transform 0s');
            $banner.css('transform', `translate(${-width}px)`);
        }, 300);
    }
    setTimeout(() => {
        checkArrow = false;
    }, 300);
});

$imageWrap.on('click', 'button.table-button', (e) => {
    let idx = e.currentTarget.id.replace('table', '');
    let $arrowButton = $(`.nav-arrow-icon${idx}`);

    if (!$arrowButton.hasClass('active-arrow')) {
        $arrowButton.addClass('active-arrow');
        $(`.table-display${idx}`).slideDown();
    } else {
        $arrowButton.removeClass('active-arrow');
        $(`.table-display${idx}`).slideUp();
    }
});



/*****************************************************/


/* 좋아요 */
// $('.wish-button').on('click', function () {
//     handleLikeButtonClick(this)
// })

function handleLikeButtonClick(element) {
    let nowKidsIdString = $(element).attr('nowkidsid');
    let nowKidsId = parseInt(nowKidsIdString);

    let lsLikeString = $(element).attr('aria-pressed');
    let isLike = (lsLikeString === "true");

    $.ajax({
        url: '/nowKidsLikes/save',
        type: 'POST',
        data: { "nowKidsId": nowKidsId, "isLike": isLike },
        success: function(response) {
            if ($(element).attr('aria-pressed') == 'false') {
                $(element).attr('aria-pressed', 'true'); // 하트 색 채우기
                $('.like-cancel-text').hide(); // 해제 문구
                $('#like-modal').css({ right: '-30%' }); // 오->왼 슬라이드 등장
                $('#like-modal').animate({ right: '30px' }, { duration: 500 }); // 오->왼 슬라이드 등장
                $('#like-modal').show(); // 슬라이드 보이기
                $('#like-modal').css({ display: 'flex' });
                $('#like-modal').css({ 'align-items': 'center' });
                $('.like-text').show(); // 찜 추가 문구
                $('#like-modal').stop().fadeOut(); // 사라지기 (애니메이션 중지 후 사라짐)
            } else {
                $(element).attr('aria-pressed', 'false'); // 색 비우기
                $('.like-text').hide(); // 찜 추가 문구
                $('#like-modal').css({ right: '-30%' }); // 오->왼 슬라이드 등장
                $('#like-modal').animate({ right: '30px' }, { duration: 500 }); // 오->왼 슬라이드 등장
                $('#like-modal').show(); // 슬라이드 보이기
                $('.like-cancel-text').show(); // 찜 해제 문구
                $('#like-modal').stop().fadeOut(); // 사라지기 (애니메이션 중지 후 사라짐)
            }
        },
    });
}


// $('.wish-button').on('click', function (e) {
//
//     let nowKidsIdString = $(e.target).attr('nowkidsid');
//     let nowKidsId = parseInt(nowKidsIdString)
//
//     let lsLikeString = $(e.target).attr('aria-pressed')
//     let isLike = (lsLikeString === "true");
//
//     $.ajax({
//         url: '/nowKidsLikes/save',
//         type: 'POST',
//         data: {"nowKidsId": nowKidsId, "isLike": isLike},
//         success: function(isLike) {
//             let target = $(e.target);
//         if ($(target).attr('aria-pressed') == 'false') {
//             $(target).attr('aria-pressed', 'true'); //하트 색 채우기
//             $('.like-cancel-text').hide(); //해제 문구
//             $('#like-modal').css({ right: '-30%' }); //오->왼 슬라이드 등장
//             $('#like-modal').animate({ right: '30px' }, { duration: 500 }); //오->왼 슬라이드 등장
//             $('#like-modal').show(); //슬라이드 보이기
//             $('#like-modal').css({ display: 'flex' });
//             $('#like-modal').css({ 'align-items': 'center' });
//             $('.like-text').show(); //찜 추가 문구
//             $('#like-modal').fadeOut(); //사라지기
//         } else {
//             $(target).attr('aria-pressed', 'false'); //색 비우기
//             $('.like-text').hide(); //찜 추가 문구
//             $('#like-modal').css({ right: '-30%' }); //오->왼 슬라이드 등장
//             $('#like-modal').animate({ right: '30px' }, { duration: 500 }); //오->왼 슬라이드 등장
//             $('#like-modal').show(); //슬라이드 보이기
//             $('.like-cancel-text').show(); //찜 해제 문구
//             $('#like-modal').fadeOut(); //사라지기
//         }
//     },
//
//     });
// })


/* 좋아요 */
// $(function () {
//     $('.wish-button').click(function (e) {
//         let target = $(e.target);
//         if ($(target).attr('aria-pressed') == 'false') {
//             $(target).attr('aria-pressed', 'true'); //하트 색 채우기
//             $('.like-cancel-text').hide(); //해제 문구
//             $('#like-modal').css({ right: '-30%' }); //오->왼 슬라이드 등장
//             $('#like-modal').animate({ right: '30px' }, { duration: 500 }); //오->왼 슬라이드 등장
//             $('#like-modal').show(); //슬라이드 보이기
//             $('#like-modal').css({ display: 'flex' });
//             $('#like-modal').css({ 'align-items': 'center' });
//             $('.like-text').show(); //찜 추가 문구
//             $('#like-modal').fadeOut(); //사라지기
//         } else {
//             $(target).attr('aria-pressed', 'false'); //색 비우기
//             $('.like-text').hide(); //찜 추가 문구
//             $('#like-modal').css({ right: '-30%' }); //오->왼 슬라이드 등장
//             $('#like-modal').animate({ right: '30px' }, { duration: 500 }); //오->왼 슬라이드 등장
//             $('#like-modal').show(); //슬라이드 보이기
//             $('.like-cancel-text').show(); //찜 해제 문구
//             $('#like-modal').fadeOut(); //사라지기
//         }
//     });
// });
/* 좋아요 끝 */

/* 시도했던 코드 */

// 초기 페이지 1번을 불러왔음으로 2번부터 시작
// let pageNumber = 2;
// $(window).scroll(function() {
//     // 문서 맨 아래에서 스크롤이 발생한 경우
//     if ($(window).scrollTop() == $(document).height() - $(window).height()) {
//         console.log($(window).scrollTop())
//         console.log($(document).height() - $(window).height())
//         $.ajax({
//             url: '/nowKid/getList',
//             type: 'POST',
//             data: { "pageNumber": pageNumber },
//             success: function(nowKidsDTOSAjax) {
//                 console.log(nowKidsDTOSAjax)
//                 if(nowKidsDTOSAjax != ''){
//
//                     let nowKidsDTO = JSON.parse(nowKidsDTOSAjax);
//                     loadMoreContent(nowKidsDTO);
//
//                     $('.wish-button').click(function() {
//                         handleLikeButtonClick(this);
//                     });
//                     pageNumber++; // 페이지 번호를 증가
//                 }
//
//             },
//         });
//     }
// });

// function loadMoreContent(nowKidsDTOSAjax) {
// nowKidsDTOSAjax.forEach((e, i) => {
//     let kidText = '';
//     let text = '';
//     console.log(e)
//     console.log(e.files)
//     console.log(e.files.length - 1)
//     text = `
//             <div class="bottom-content-flex" id ="${i}">
//                 <section class="feed-header-full-wrap">
//                     <div class="modify-delete">
//                         <button type="button">수정하기</button>
//                         <button type="button">삭제하기</button>
//                     </div>
//                     <div class="feed-header-inner-flex">
//                         <div class="feed-header-left-flex">
//                             <a class="feed-header-user-img-wrap">
//                                 <span class="feed-header-user-img"
//                                 data-member-profile-path="${e.memberProfilePath}"
//                                 data-member-profile-uuid="${e.memberProfileUUID}"
//                                 data-member-profile-original-name="${e.memberProfileOriginalName}">
//                                 >
//                                 <span class="feed-header-new-img">
//                                 </span>
//                             </a>
//                             <div class="feed-header-new-board">
//                                 <em class="feed-header-user-name">
//                                     ${e.memberNickname}
//                                 </em>
//                             </div>
//                         </div>
//                         <span class="feed-header-time">${getTimeAgo(e.eventStartDate)}</span>
//                     </div>
//                 </section>
//                 <div class=title-like-wrap>
//                     <button type="button" class="wish-button" aria-pressed="${e.isLiked}" nowKidsId="${e.nowKidsId}" eventId="${e.eventId}">
//                         <svg viewBox="0 0 32 32" focusable="false" role="presentation" class="wish-button-svg" aria-hidden="true">
//                             <path d="M22.16 4h-.007a8.142 8.142 0 0 0-6.145 2.79A8.198 8.198 0 0 0 9.76 3.998a7.36 7.36 0 0 0-7.359 7.446c0 5.116 4.64 9.276 11.6 15.596l2 1.76 2-1.76c6.96-6.32 11.6-10.48 11.6-15.6v-.08A7.36 7.36 0 0 0 22.241 4h-.085z"></path>
//                         </svg>
//                     </button>
//                     <span class="bottom-event-title">${e.boardTitle}</span>
//                 </div>
//
//                 <div class="board-component-image-wrapper">
//                     <section class="banner-container">
//                         <!-- 메인 배너 -->
//                         <div class="banner" id="banner${i}">
//                         /* 이미지가 없으면 이 이미지아래로 이미지 태그 전부를 if로 감싸야한다. */
//                         <div>
//                               <img src="/nowKidsFiles/display?fileName=NowKids/${e.files[e.files.length - 1].filePath}/${e.files[e.files.length - 1].fileUUID}_${e.files[e.files.length - 1].fileOriginalName}">
//                         </div>
//
// `;
//     e.files.forEach((image, j) => {
//         console.log(image)
//         let totalWidth = width * (image.length);
//         $($banner[j]).css('width', `${totalWidth}px`);
//         text += `
//                 <div>
//                    <img src="/nowKidsFiles/display?fileName=NowKids/${image.filePath}/${image.fileUUID}_${image.fileOriginalName}">
//                 </div>
//     `;
//     });
//
//     e.kids.forEach((kid, k) => {
//         kidText += `
//         <!-- 하나의 데이터 -->
//                     <tr>
//                         <td>${k}</td>
//                         <td>${kid.kidName}</td>
//                         <td>${kid.kidAge}</td>
//                         <td>${nowKidsDTOSAjax[i].memberNickname}</td>
//                         <td>${convertDate(nowKidsDTOSAjax[i].eventStartDate)}</td>
//                     </tr>
//                 `;
//
//     });
//
//     text += `
//
//             <div>
//                 <img src="/nowKidsFiles/display?fileName=NowKids/${e.files[0].filePath}/${e.files[0].fileUUID}_${e.files[0].fileOriginalName}">
//             </div>
//         </div>
//         <div class="move-arrow">
//             <!-- 이전 버튼 -->
//             <div class="prev" id="prev${i}">
//                 <img data-role="none" class="prev-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E" style="display: block;">
//             </div>
//             <!-- 다음 버튼 -->
//             <div class="next" id="next${i}">
//                 <img data-role="none" class="prev-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E" style="display: block;">
//             </div>
//         </div>
//     </section>
//     </div>
//     <section class="bottom-full-wrap">
//         <section class="bottom-event-title-wrap">
//         참여인원 보기
//             <button type="button" id="table${i}" class="table-button">
//                 <span>
//                     <svg viewBox="0 0 32 32" focusable="false" role="presentation" class="nav-arrow-icon" aria-hidden="true" style="width: 18px; height: 20px; margin-left: 5px;">
//                         <path d="M16 22.4L5.6 12l1.12-1.12L16 20.16l9.28-9.28L26.4 12 16 22.4z"></path>
//                     </svg>
//                 </span>
//             </button>
//         </section>
//         <div class="table-display">
//         <div class="table-kids-count">${nowKidsDTOSAjax[i].kids[0].kidName}<span>&nbsp;외&nbsp;</span><span>${nowKidsDTOSAjax[i].kids.length - 1}</span>명</div>
//             <table class="table-box">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>이름</th>
//                         <th>나이</th>
//                         <th>통솔자 이름</th>
//                         <th>참여일자</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     ${kidText}
//                 </tbody>
//             </table>
//         </div>
//     </section>
//     <div class="bottom-space"></div>
//     </div>
// `;
//     $imageWrap.append(text);
// });
// }