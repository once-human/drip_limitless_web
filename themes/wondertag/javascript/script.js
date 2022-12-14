current_notification_number = 0;
current_notification_number = 0;
current_messages_number = 0;
current_follow_requests_number = 0;

current_width = $(window).width();
document_title = document.title;

document.querySelectorAll('.auto-resize').forEach(el => {
  el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
  el.classList.add('auto');
  el.addEventListener('input', e => {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
  });
});

// Static Dropdown
$(document).on('click', '.dropdown-static-menu', function (e) {
  e.stopPropagation();
});

$(document).on('click', '.filterby li.filter-by-li a', function(event) {
  $('.filterby li.filter-by-li').each(function(){
    $(this).removeClass('active');
  });
  $(this).parent().addClass('active');
});

$(function () {
  
  $(window).on("dragover",function(e){
    e.preventDefault();
  },false);

  $(window).on("drop",function(e){
    e.preventDefault();
  },false);

  //$('.postText').autogrow({vertical: true, horizontal: false, height: 200});
  $('#movies-comment').autogrow({vertical: true, horizontal: false, height: 200});
  $('#blog-comment').autogrow({vertical: true, horizontal: false, height: 200});
  var api = $('#api').val();
  var hash = $('.main_session').val();
  setTimeout(function (argument) {
    $.ajaxSetup({ 
    data: {
        hash: hash
    },
    cache: false 
  });
  },100)
  $(document).on("click",".mfp-arrow",function(event) {
    Wo_StoryProgress();
  });
  $(document).on('click', '.messages-recipients-list', function(event) {
    scrollToTop();
  });
  $('[data-toggle="tooltip"]').tooltip();
  // open last active tab
  var url = document.location.toString();
  if(url.match('#')) {
    var val_hash = url.split('#')[1];
    $('.nav-tabs a[href="#' + val_hash + '"]').tab('show');
  }
  $('.nav-tabs a').on('shown.bs.tab', function (e) {
    //window.location.hash = e.target.hash;
    $('body').scrollTop(0);
  });
  
	intervalUpdates = setTimeout(Wo_intervalUpdates, 6000);
	if (node_socket_flow == "0") {
      //setTimeout(Wo_UpdateLastSeen, 40000);
      setTimeout(Wo_IsLogged, 30000);
    }

  scrolled = 0;
  if(current_width > 90 || api) {
    $(window).scroll(function () {
      var nearToBottom = 500;
      if($('#posts').length > 0) {
          if ($(window).scrollTop() + $(window).height() > $(document).height() - nearToBottom) {
            if (scrolled == 0) {
               scrolled = 1;
               Wo_GetMorePosts();
            }
          }
      }
    });
  }
});


function Wo_CloseModels() {
  $('.modal').modal('hide');
}
// update user last seen
function Wo_UpdateLastSeen() {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'update_lastseen'
  }, function () {
    setTimeout(Wo_UpdateLastSeen, 40000);
  });
}
// js function
function Wo_CheckUsername(username) {
  var check_container = $('.checking');
  var check_input = $('#username').val();
  if(check_input == '') {
    check_container.empty();
    return false;
  }
  check_container.removeClass('unavailable').removeClass('available').html('<span id="loading"> Checking <span>.</span><span>.</span><span>.</span></span>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'check_username',
    username: username
  }, function (data) {
    if(data.status == 200) {
      check_container.html('<i class="fa fa-check"></i> ' + data.message).removeClass('unavailable').addClass('available');
    } else if(data.status == 300) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 400) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 500) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 600) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    }
  });
}

function Wo_CheckPagename(pagename, page_id) {
  var check_container = $('.checking');
  var check_input = $('#page_name').val();
  if(check_input == '') {
    check_container.empty();
    return false;
  }
  check_container.removeClass('unavailable').removeClass('available').html('<i class="fa fa-clock-o"></i><span id="loading"> Checking <span>.</span><span>.</span><span>.</span></span>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'check_pagename',
    pagename: pagename,
    page_id: page_id
  }, function (data) {
    if(data.status == 200) {
      check_container.html('<i class="fa fa-check"></i> ' + data.message).removeClass('unavailable').addClass('available');
    } else if(data.status == 300) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 400) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 500) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 600) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    }
  });
}

function Wo_CheckGroupname(groupname, group_id) {
  var check_container = $('.checking');
  var check_input = $('#group_name').val();
  if(check_input == '') {
    check_container.empty();
    return false;
  }
  check_container.removeClass('unavailable').removeClass('available').html('<i class="fa fa-clock-o"></i><span id="loading"> Checking <span>.</span><span>.</span><span>.</span></span>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'check_groupname',
    groupname: groupname,
    group_id:group_id
  }, function (data) {
    if(data.status == 200) {
      check_container.html('<i class="fa fa-check"></i> ' + data.message).removeClass('unavailable').addClass('available');
    } else if(data.status == 300) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 400) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 500) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 600) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    }
  });
}

// scroll to top function
function scrollToTop() {
  verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $('html');
  offset = element.offset();
  offsetTop = offset.top;
  $('html, body').animate({
    scrollTop: offsetTop
  }, 300, 'linear');
}

// check if user is logged in function
function Wo_IsLogged() {
  $.post(Wo_Ajax_Requests_File() + '?f=session_status', function (data) {
    setTimeout(Wo_UpdateLastSeen, 30000);
    if(data.status == 200) {
      $('#logged-out-modal').modal({
        show: true
      });
    }
  });
}

// side bar users
function Wo_ReloadSideBarUsers() {
	$('.sidebar-users-may-know-container').html('<div class="wow_side_usrs"><div class="tag_sidebar_users"><a class="avatar"><div class="skel"></div></a><div class="skel skel_2 skel_noti_name"></div><div class="clear"></div></div></div><div class="wow_side_usrs"><div class="tag_sidebar_users"><a class="avatar"><div class="skel"></div></a><div class="skel skel_2 skel_noti_name"></div><div class="clear"></div></div></div><div class="wow_side_usrs"><div class="tag_sidebar_users"><a class="avatar"><div class="skel"></div></a><div class="skel skel_2 skel_noti_name"></div><div class="clear"></div></div></div><div class="wow_side_usrs"><div class="tag_sidebar_users"><a class="avatar"><div class="skel"></div></a><div class="skel skel_2 skel_noti_name"></div><div class="clear"></div></div></div>');
	$.get(Wo_Ajax_Requests_File(), {
		f: 'update_sidebar_users'
	}, function (data) {
		if(data.status == 200) {
			$('.sidebar-users-may-know-container').html(data.html);
		}
	});
}

function Wo_ReloadSideBarGroups() {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'update_sidebar_groups'
  }, function (data) {
    if(data.status == 200) {
      $('.sidebar-group-may-know-container').html(data.html);
    }
  });
}

// side bar pages
function Wo_ReloadSideBarPages() {
  var page_id = $('.sidebar-pages-may-know-container').find('.sidebar-page-data').attr('data-page-id');
  if (page_id == 'undefined') {
      page_id = '';
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'pages',
    s: 'get_next_page',
    page_id: page_id
  }, function (data) {
    if(data.status == 200) {
      if (data.html.length == 0) {
        $('.sidebar-pages-may-know-container').html('<h2><div class="no-more-pages text-center">No more pages to like</div></h2>');
      } else {
        $('.sidebar-pages-may-know-container').hide().html(data.html).fadeIn(300);
      }
    }
  });
}

// get new notifications
function Wo_OpenNotificationsMenu() {
  notification_container = $('.notification-container');
  notification_list = $('#notification-list');
  notification_container.find('.new-update-alert').addClass('hidden').text('0');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'get_notifications'
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        notification_list.html('<div class="empty_state"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0" fill="#e3f8fa"/><path d="m245.328125 384c19.3125 0 35.472656-13.761719 39.183594-32h-78.382813c3.726563 18.238281 19.886719 32 39.199219 32zm0 0" fill="#8ce1eb"/><path d="m320.128906 256c-.050781 0-.082031 0-.128906 0-41.167969 0-74.671875-33.488281-74.671875-74.671875 0-11.3125 2.609375-22.015625 7.136719-31.648437-2.351563-.222657-4.722656-.367188-7.136719-.367188-41.230469 0-74.671875 33.421875-74.671875 74.671875v29.742187c0 21.105469-9.25 41.027344-25.472656 54.753907-5.40625 4.625-7.808594 11.984375-5.871094 19.152343 2.289062 8.367188 10.527344 13.695313 19.199219 13.695313h173.601562c9.085938 0 17.664063-5.886719 19.503907-14.785156 1.421874-6.878907-1.023438-13.773438-6.371094-18.253907-15.519532-13.023437-24.476563-32.128906-25.117188-52.289062zm0 0" fill="#26c6da"/><path d="m373.328125 181.328125c0 29.453125-23.875 53.328125-53.328125 53.328125s-53.328125-23.875-53.328125-53.328125 23.875-53.328125 53.328125-53.328125 53.328125 23.875 53.328125 53.328125zm0 0" fill="#8ce1eb"/></svg>' + data.message + '</div>');
      } else {
        document.getElementById('notification-list').innerHTML = data.html;
        Wo_intervalUpdates();
      }
    }
  });
}
function Wo_OpenMessagesMenu() {
  messages_container = $('.messages-notification-container');
  messages_list = $('#messages-list');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'get_messages'
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        messages_list.html('<div class="empty_state"><svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" fill="#ffe6e2"/><g fill="#fc573b"><circle cx="20.333" cy="17.667" r="2"/><path d="m22.167 20.667h-3.667c-1.011 0-1.833.822-1.833 1.833v1c0 .276.224.5.5.5h6.333c.276 0 .5-.224.5-.5v-1c0-1.011-.822-1.833-1.833-1.833z"/><circle cx="10.667" cy="19.333" r="1.333"/><path d="m11.5 21.333h-1.667c-1.011 0-1.833.823-1.833 1.834v.333c0 .276.224.5.5.5h4.333c.276 0 .5-.224.5-.5v-.333c0-1.011-.822-1.834-1.833-1.834z"/></g><path d="m16.167 8h-6.334c-1.011 0-1.833.822-1.833 1.833v5c0 1.011.822 1.833 1.833 1.833h3.305l2.023 1.868c.094.087.216.132.339.132.068 0 .136-.014.201-.042.181-.079.299-.259.299-.457v-1.5h.167c1.011 0 1.833-.822 1.833-1.833v-5c0-1.012-.822-1.834-1.833-1.834zm-3.167 7c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zm.5-2.167c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2.333c0-.276.224-.5.5-.5s.5.224.5.5z" fill="#fd907e"/></svg>' + data.message + '</div>');
      } else {
        //messages_list.html(data.html);
        document.getElementById('messages-list').innerHTML = data.html;
        messages_list.append('<a href="' + data.messages_url + '" class="show-message-link" target="_blank">' + data.messages_text + '</a>');
        //Wo_intervalUpdates();
      }
    }
  });
}
// get new friend requests
function Wo_OpenRequestsMenu() {
  requests_container = $('.requests-container');
  requests_List = $('#requests-list');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'get_follow_requests'
  }, function (data) {
    if(data.status == 200) {
	  requests_container.find('.new-update-alert').addClass('hidden');
      requests_container.find('.new-update-alert').addClass('hidden').text('0').hide();
      if(data.html.length == 0) {
        requests_List.html('<div class="empty_state"><svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" fill="#f5e6fe"/><g fill="#be63f9"><path d="m10.4 10.733c0-.667 1.011-2.4 2.933-2.4 1.911 0 2.94 1.733 2.94 2.4-.007 0-.02.007-.027.007-1.12.3-1.847-.92-1.873-.973-.118-.192-.368-.213-.52-.073-1.413 1.313-3.3 1.059-3.453 1.039z"/><path d="m14.02 10.427c-1.52 1.193-3.313 1.02-3.68.973-.081 1.215 1.094 2.933 2.993 2.933 1.907 0 3.079-1.73 2.993-2.933-.883.23-1.727-.249-2.306-.973z"/><path d="m15.804 15.667h-5.304c-1.379 0-2.5 1.121-2.5 2.5v2.333c0 .276.224.5.5.5h6.104c-.625-1.893-.144-3.918 1.2-5.333z"/></g><path d="m19.667 15c-2.389 0-4.333 1.944-4.333 4.333s1.944 4.333 4.333 4.333 4.333-1.943 4.333-4.333-1.944-4.333-4.333-4.333zm1.638 5.029c.26.26.26.682 0 .943-.26.26-.682.26-.943 0l-.695-.695-.695.695c-.26.26-.682.26-.943 0-.26-.26-.26-.682 0-.943l.695-.695-.695-.695c-.26-.26-.26-.682 0-.943s.682-.26.943 0l.695.695.695-.695c.26-.26.682-.26.943 0s.26.682 0 .943l-.695.695z" fill="#d9a4fc"/></svg>' + data.message + '</div>');
      } else {
        requests_List.html(data.html);
        Wo_intervalUpdates();
      }
    }
  });
}

// Notifications & follow requests updates
function Wo_intervalUpdates(force_update = 0, loop = 0) {
	if (node_socket_flow == "0" || force_update == 1) {
	var check_posts = true;
	var hash_posts = true;
	if ($('.posts-hashtag-count').length == 0) {
      hash_posts = false;
	}
	var api = $('#api').val();
	if (api) {
      return false;
	}
	if ($('.posts-count').length == 0 || hash_posts == true) {
      check_posts = false;
	}
	if(typeof ($('#posts').attr('data-story-user')) == "string") {
      user_id = $('#posts').attr('data-story-user');
	} else {
      user_id = 0;
	}
	before_post_id = 0;
	if($('.post-container').length > 0) {
      var before_post_id = $('.post-container  > .post:not(.boosted)').attr('data-post-id');
	}
	var notification_container = $('.notification-container');
	var messages_notification_container = $('.messages-notification-container');
	var follow_requests_container = $('.requests-container');
	var ajax_request = {
      f: 'update_data',
      user_id: user_id,
      before_post_id: before_post_id,
      check_posts:check_posts,
      hash_posts:hash_posts
    };
	if (hash_posts == true) {
      ajax_request['hashtagName'] = $('#hashtagName').val();
	}
	$.get(Wo_Ajax_Requests_File(), ajax_request, function (data) {
	  if (node_socket_flow == "0" || force_update == 0 || loop == 1) {
          clearTimeout(intervalUpdates);
          intervalUpdates = setTimeout(function () {
            Wo_intervalUpdates(force_update);
          } , 5000);
      }
    if (hash_posts == true) {
        if (data.count_num > 0) {
          $('.posts-count').html(data.count);
        }
    } else {
        if (data.count_num > 0 && $('.filter-by-more').attr('data-filter-by') == 'all') {
          $('.posts-count').html(data.count);
        }
    }
    if(typeof (data.notifications) != "undefined" && data.notifications > 0) {
      notification_container.find('.new-update-alert').removeClass('hidden');
      notification_container.find('.sixteen-font-size').addClass('unread-update');
      notification_container.find('.new-update-alert').text(data.notifications).show();
      if(current_width > 800 && data.pop == 200) {
        Wo_NotifyMe(data.icon, decodeHtml(data.title), decodeHtml(data.notification_text), data.url);
      }
      if(data.notifications != current_notification_number) {
        if (data.notifications_sound == 0 && current_notification_number) {
           document.getElementById('notification-sound').play();
        }
        current_notification_number = data.notifications;
      }
    } else {
      notification_container.find('.new-update-alert').hide();
      notification_container.find('.sixteen-font-size').removeClass('unread-update');
      current_notification_number = 0;
    }
    if(typeof (data.messages) != "undefined" && data.messages > 0) {
      messages_notification_container.find('.new-update-alert').removeClass('hidden');
      messages_notification_container.find('.sixteen-font-size').addClass('unread-update');
      messages_notification_container.find('.new-update-alert').text(data.messages).show();
      if(data.messages != $("[data_messsages_count]").attr('data_messsages_count')) {
        if (data.notifications_sound == 0 && $("[data_messsages_count]").attr('data_messsages_count') < data.messages) {
          document.getElementById('message-sound').play();
        }
		$("[data_messsages_count]").attr('data_messsages_count', data.messages);
        current_messages_number = data.messages;
      }
    } else {
      messages_notification_container.find('.new-update-alert').hide();
      messages_notification_container.find('.sixteen-font-size').removeClass('unread-update');
      current_messages_number = 0;
    }
    if(typeof (data.followRequests) != "undefined" && data.followRequests > 0) {
      follow_requests_container.find('.new-update-alert').removeClass('hidden');
      follow_requests_container.find('.sixteen-font-size').addClass('unread-update');
      follow_requests_container.find('.new-update-alert').text(data.followRequests).show();
      if(data.followRequests != current_follow_requests_number) {
        current_follow_requests_number = data.followRequests;
      }
    } else {
      follow_requests_container.find('.new-update-alert').hide();
      follow_requests_container.find('.sixteen-font-size').removeClass('unread-update');
      current_follow_requests_number = 0;
    }

    if(typeof (data.messages) != "undefined" && data.messages > 0 || typeof (data.notifications) != "undefined" && data.notifications > 0 || typeof (data.followRequests) != "undefined" && data.followRequests > 0) {
      title = Number(data.notifications) + Number(data.messages) + Number(data.followRequests);
      document.title = '(' + title + ') ' + document_title;
    } else {
      document.title = document_title;
    }
    if (data.calls == 200 && $('#re-calling-modal').length == 0 && $('#re-talking-modal').length == 0) {
         if ($('#calling-modal').length == 0) {
          $('body').append(data.calls_html);
          if (!$('#re-calling-modal').hasClass('calling')) {
            $('#re-calling-modal').modal({
             show: true
            });
            Wo_PlayVideoCall('play');
			$('body').addClass('tag_call_incoming');
          }
          document.title = 'New video call..';
          setTimeout(function () {
            Wo_CloseModels();
            $('#re-calling-modal').addClass('calling');
            Wo_PlayVideoCall('stop');
            document.title = document_title;
            setTimeout(function () {
              $( '#re-calling-modal' ).remove();
              $( '.modal-backdrop' ).remove();
              $( 'body' ).removeClass( "modal-open" );
			  $('body').removeClass('tag_call_incoming');
            }, 3000);
            $( '#re-calling-modal' ).remove();
            $('.modal-backdrop.in').hide();
          }, 40000);
         } 
    } else if (data.audio_calls == 200 && $('#re-calling-modal').length == 0 && $('#re-talking-modal').length == 0) {
      if ($('#calling-modal').length == 0) {
          $('body').append(data.audio_calls_html);
          if (!$('#re-calling-modal').hasClass('calling')) {
            $('#re-calling-modal').modal({
             show: true
            });
            Wo_PlayVideoCall('play');
			$('body').addClass('tag_call_incoming');
          }
          document.title = 'New audio call..';
          setTimeout(function () {
            if ($('#re-talking-modal').length == 0) {
               Wo_CloseModels();
               $('#re-calling-modal').addClass('calling');
               Wo_PlayVideoCall('stop');
               document.title = document_title;
               setTimeout(function () {
                 $( '#re-calling-modal' ).remove();
                 $( '.modal-backdrop' ).remove();
                 $( 'body' ).removeClass( "modal-open" );
				 $('body').removeClass('tag_call_incoming');
               }, 3000)
            }
          }, 40000);
         } 
    } else if (data.is_audio_call == 0 && data.is_call == 0 && ($('#re-calling-modal').length > 0 || $('#re-talking-modal').length > 0)) {
        Wo_PlayVideoCall('stop');
        $( '#re-calling-modal' ).remove();
        $( '.modal-backdrop' ).remove();
        $( 'body' ).removeClass( "modal-open" );
		$('body').removeClass('tag_call_incoming');
    }
  }).fail(function() {
      clearTimeout(intervalUpdates);
		  if (force_update == 0) {
            intervalUpdates = setTimeout(function () {
              Wo_intervalUpdates(force_update);
            } , 5000);
          }
    });
	}
}

function RemoveNotification(obj) {
  current_notifications = $('.notification-container').find('.new-update-alert').text();
  $('.notification-container').find('.new-update-alert').removeClass('hidden');
  if (Number(current_notifications) > 0) {
     if ((Number(current_notifications) - 1) == 0) {
        $('.notification-container').find('.new-update-alert').addClass('hidden');
        $('.notification-container').find('.new-update-alert').addClass('hidden').text('0').hide();
     } else {
        $('.notification-container').find('.sixteen-font-size').addClass('unread-update');
        $('.notification-container').find('.new-update-alert').text(Number(current_notifications) - 1).show();
     }
  } else if (Number(current_notifications) == 0) {
     $('.notification-container').find('.new-update-alert').addClass('hidden');
     $('.notification-container').find('.new-update-alert').addClass('hidden').text('0').hide();
  } 
  $(obj).fadeOut(1000, function () {
    $(this).remove();
  });
}

function Wo_GetLastNotification() {
    if(current_width > 800) {
      $.get(Wo_Ajax_Requests_File(), { f: 'get_last_notification', }, function (data) {
          $('#notification-popup').append(data.html);
          setTimeout(function () {
            $('#notification-popup').find("[data-id='" + data.id + "']").fadeOut(2000, function () {
              $(this).remove();
            });
          }, 3000)
      });   
    } 
}

function Wo_GetNewHashTagPosts() {
  before_post_id = 0;
  if($('.post-container').length > 0) {
    var before_post_id = $('.post-container  > .post:not(.boosted)').attr('data-post-id');
  }
  var hashtagName = $('#hashtagName').val();
  if (!hashtagName) {
    return false;
  }
 var api = $('#api').val();
  var api_ = 0;
  if (api) {
    api_ = 1;
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_new_hashtag_posts',
    before_post_id: before_post_id,
    hashtagName: hashtagName,
    api: api_
  }, function (data) {
    if(data.length > 0) {
      $('#posts_hashtag').find('.posts-container').remove();
      $('#posts_hashtag').prepend(data);
    }
     $('.posts-count').empty();
  });
}
// intervel new posts
function Wo_GetNewPosts() {
  var filter_by_more = $('#load-more-filter').find('.filter-by-more').attr('data-filter-by');
  if(filter_by_more != 'all') {
    return false;
  }
  if(typeof ($('#posts').attr('data-story-user')) == "string") {
    user_id = $('#posts').attr('data-story-user');
  } else {
    user_id = 0;
  }
  var api = $('#api').val();
  var api_ = 0;
  if (api) {
    api_ = 1;
  }
  before_post_id = 0;
  if($('.post-container').length > 0) {
    var before_post_id = $('.post-container  > .post:not(.boosted)').attr('data-post-id');
  }
  $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_new_posts',
    before_post_id: before_post_id,
    user_id: user_id,
    api: api_
  }, function (data) {
    if(data.length > 0) {
      $('#posts').find('.posts-container').remove();
      $('#posts').prepend(data);
    }
     $('.posts-count').empty();
  });
}

// load more posts

function Wo_GetMorePosts() {
  var more_posts = $('#load-more-posts');
  var filter_by_more = $('#load-more-filter').find('.filter-by-more').attr('data-filter-by');
  var after_post_id = $('div.post:last').attr('data-post-id');
  var page_id = 0;
  var user_id = 0;
  var group_id = 0;
  var event_id = 0;
  var is_api = 0;
  var ad_id    = 0;
  var story_id = 0;
  var api = $('#api').val();
  if (api) {
    is_api = 1;
  }
  if(after_post_id != null) {
    more_posts.show();
  }
  if(typeof ($('#posts').attr('data-story-user')) == "string") {
    user_id = $('#posts').attr('data-story-user');
  } else if(typeof ($('#posts').attr('data-story-page')) == "string") {
    page_id = $('#posts').attr('data-story-page');
  } else if(typeof ($('#posts').attr('data-story-group')) == "string") {
    group_id = $('#posts').attr('data-story-group');
  } else if(typeof ($('#posts').attr('data-story-event')) == "string") {
    event_id = $('#posts').attr('data-story-event');
  }
  $('#posts').append('<div class="hidden loading-status loading-single"></div>');
  $('#load-more-posts').hide();
  $('.loading-status').hide().html('<div class="wow_content p15 tag_post_skel"><div class="valign"><div class="skel skel_50 skel_avatar"></div><div><div class="skel skel_2 skel_noti_name"></div><div class="skel skel_2 skel_noti_time"></div></div></div><div class="valign tag_post_skel_foot"><div class="valign"><div class="skel skel_action"></div><div class="skel skel_action"></div></div><div><div class="skel skel_action"></div></div></div></div><div class="wow_content p15 tag_post_skel"><div class="valign"><div class="skel skel_50 skel_avatar"></div><div><div class="skel skel_2 skel_noti_name"></div><div class="skel skel_2 skel_noti_time"></div></div></div><div class="valign tag_post_skel_foot"><div class="valign"><div class="skel skel_action"></div><div class="skel skel_action"></div></div><div><div class="skel skel_action"></div></div></div></div>').removeClass('hidden').show();
  Wo_progressIconLoader($('#load-more-posts'));
  posts_count = 0;
  if ($('.post').length > 0) {
    posts_count = $('.post').length;
  }
  
  if ($(".user-ad-container").length > 0) {
    ad_id = $(".user-ad-container").last().attr('id');
  }

  if ($(".user-story-container").length > 0) {
    story_id = $(".user-story-container").last().attr('id');
  }
  
  if ($('body').attr('no-more-posts')) {
      $('#load-more-posts').html('<div class="wow_content p15"><div class="empty_state"><svg height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" fill="#fff9dd"/><path d="m20.167 8h-8.333c-1.012 0-1.834.822-1.834 1.833v12.333c0 1.012.822 1.834 1.833 1.834h8.333c1.012 0 1.834-.822 1.834-1.833v-12.334c0-1.011-.822-1.833-1.833-1.833zm-7.5 3.333h3.5c.368 0 .667.299.667.667s-.299.667-.667.667h-3.5c-.369 0-.667-.299-.667-.667s.298-.667.667-.667zm6.666 9.334h-6.667c-.368 0-.666-.299-.666-.667s.299-.667.667-.667h6.667c.368 0 .666.299.666.667s-.298.667-.667.667zm0-2.667h-6.667c-.368 0-.666-.298-.666-.667s.299-.667.667-.667h6.667c.368 0 .667.299.667.667s-.299.667-.668.667zm0-2.667h-6.667c-.368 0-.667-.299-.667-.667s.299-.666.668-.666h6.667c.368 0 .666.298.666.667s-.298.666-.667.666z" fill="#ffd200"/></svg>' + $('#get_no_posts_name').val() + '</div></div>');
      $('#load-more-posts').show();
      $('.loading-status').remove();
      scrolled = 0;
      return false;
  }
  if ($('#page_post_jobs_filter').length > 0) {
    filter_by_more = 'job';
  }
  if ($('#page_post_offer_filter').length > 0) {
    filter_by_more = 'offer';
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_posts',
    filter_by_more: filter_by_more,
    after_post_id: after_post_id,
    user_id: user_id,
    page_id: page_id,
    group_id: group_id,
    event_id: event_id,
    posts_count: posts_count,
    is_api: is_api,
    ad_id: ad_id,
    story_id:story_id
  }, function (data) {
    if (data.length == 0) {
      $('body').attr('no-more-posts', "true");
      $('#load-more-posts').html('<div class="wow_content p15"><div class="empty_state"><svg height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" fill="#fff9dd"/><path d="m20.167 8h-8.333c-1.012 0-1.834.822-1.834 1.833v12.333c0 1.012.822 1.834 1.833 1.834h8.333c1.012 0 1.834-.822 1.834-1.833v-12.334c0-1.011-.822-1.833-1.833-1.833zm-7.5 3.333h3.5c.368 0 .667.299.667.667s-.299.667-.667.667h-3.5c-.369 0-.667-.299-.667-.667s.298-.667.667-.667zm6.666 9.334h-6.667c-.368 0-.666-.299-.666-.667s.299-.667.667-.667h6.667c.368 0 .666.299.666.667s-.298.667-.667.667zm0-2.667h-6.667c-.368 0-.666-.298-.666-.667s.299-.667.667-.667h6.667c.368 0 .667.299.667.667s-.299.667-.668.667zm0-2.667h-6.667c-.368 0-.667-.299-.667-.667s.299-.666.668-.666h6.667c.368 0 .666.298.666.667s-.298.666-.667.666z" fill="#ffd200"/></svg>' + $('#get_no_posts_name').val() + '</div></div>');
     } else {
      if (data != 'Please login or signup to continue.') {
          $('body').removeAttr('no-more-posts');
          $('#posts').append(data);
      } else {
         $('body').attr('no-more-posts', "true");
      }
    }
    $('#load-more-posts').show();
    $('.loading-status').remove();
    Wo_progressIconLoader($('#load-more-posts'));
    scrolled = 0;
  });
}

function animateStory(element) {
  if ($(element).hasClass('opacity')) {
      $(element).removeClass('opacity');
      $(element).addClass('no-opacity');
    } else {
       $(element).removeClass('no-opacity');
       $(element).addClass('opacity');
    }
}
function Wo_LoadStory(type, user_id, element) {

  var filter_by_more = $('#load-more-filter').find('.filter-by-more');
  filter_by_more.attr("data-filter-by", 'story');
  var filter_by_progress_icon = $('.filter-container').find('.type-story');
  Wo_progressIconLoader(filter_by_progress_icon);
  var story = null;
  var user  = null;
  if (type == 'all') {
    story   = 'a';
    user    = 0;
  }
  else if(type == 'prof' && user_id){
    story   = 'p';
    user    = user_id;
  }
  animateStory(element);
  var animation = setInterval(function () {
    animateStory(element);
  }, 500);
  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'status',s:story,id:user},
  })
  .done(function(data) {
    if (data.status == 200) {
      $('#posts').html(data.html);
    }
    else if(data.status == 404){
      $('#posts').html(data.html);
    }
    $(element).removeClass('opacity');
    clearInterval(animation);
    Wo_progressIconLoader(filter_by_progress_icon);
  })
  .fail(function() {
    console.log("error");
  })
  
}
function Wo_ResetStory() {
  $('.mfp-progress-line span').css('width', '0%');
}

// post filteration
function Wo_FilterPostBy(filter_by) {
  var more_posts = $('#load-more-posts');
  var filter_by_more = $('#load-more-filter').find('.filter-by-more');
  filter_by_more.attr("data-filter-by", filter_by);
  //Wo_progressIconLoader(filter_by_progress_icon);
  var type = '';
  var id = 0;
  if(typeof ($('#posts').attr('data-story-user')) == "string") {
    id = $('#posts').attr('data-story-user');
    type = 'profile';
  } else if(typeof ($('#posts').attr('data-story-page')) == "string") {
    id = $('#posts').attr('data-story-page');
    type = 'page';
  } else if (typeof ($('#posts').attr('data-story-group')) == "string") {
    id = $('#posts').attr('data-story-group');
    type = 'group';
  } else if (typeof ($('#posts').attr('data-story-event')) == "string") {
    id = $('#posts').attr('data-story-event');
    type = 'event';
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'filter_posts',
    filter_by: filter_by,
    id: id,
    type: type
  }, function (data) {
    if(data) {
	  $('html, body').animate({
		scrollTop: $('#scroll_filter_click').offset().top - 100 //#DIV_ID is an example. Use the id of your destination on the page
	  }, 500);
      $('#posts').html(data);
      
    }
  });
}
// register post share
function Wo_RegisterShare(post_id) {
  var post = $('#post-' + post_id);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'register_share',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      post.find("#share-button").addClass('active');
      post.find("[id^=shares]").text(data.shares);
    } else {
      post.find("#share-button").removeClass('active');
      post.find("[id^=shares]").text(data.shares);
    }
    if (data.can_send == 1) {
        Wo_SendMessages();
    }
  });
}

// open post share buttons
function Wo_OpenShareBtns(post_id) {
  post_wrapper = $('#post-' + post_id);
  post_wrapper.find('.post-share').slideToggle(200);
}
// register post comment
function Wo_RegisterCommentClick(text, post_id, user_id, page_id, type) {
    post_wrapper = $('[id=post-' + post_id + ']');
    comment_textarea = post_wrapper.find('.post-comments');
    comment_btn = comment_textarea.find('.emo-comment');
    textarea_wrapper = comment_textarea.find('.textarea');
    comment_list = post_wrapper.find('.comments-list');
    if(text == '') {
      return false;
    }
    textarea_wrapper.val('');
    Wo_progressIconLoader(comment_btn);
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment', {
      post_id: post_id,
      text: text,
      user_id: user_id,
      page_id: page_id
    }, function (data) {
      if(data.status == 200) {
        post_wrapper.find('.comment-container:first-child').before(data.html);
        post_wrapper.find('[id=comments]').html(data.comments_num);
      }
      Wo_progressIconLoader(comment_btn);
      if (data.can_send == 1) {
        Wo_SendMessages();
      }
    });
}
// register post comment
function Wo_LightBoxComment(text, post_id, user_id, event, page_id) {
  if(event.keyCode == 13 && event.shiftKey == 0) {
    post_wrapper = $('#lightbox-post-' + post_id);
    comment_textarea = post_wrapper.find('.post-comments');
    comment_btn = comment_textarea.find('.comment-btn');
    textarea_wrapper = comment_textarea.find('.textarea');
    comment_list = post_wrapper.find('.comments-list');
    if(textarea_wrapper.val() == '') {
      return false;
    }
    textarea_wrapper.val('');
    Wo_progressIconLoader(comment_btn);
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment', {
      post_id: post_id,
      text: text,
      user_id: user_id,
      page_id: page_id
    }, function (data) {
      if(data.status == 200) {
        post_wrapper.find('.comment-container:first-child').before(data.html);
        post_wrapper.find('#comments').html(data.comments_num);
      }
      Wo_progressIconLoader(comment_btn);
      if (data.can_send == 1) {
        Wo_SendMessages();
      }
    });
  }
}

function Wo_loadPostMoreComments(post_id,self) {
  main_wrapper = $('#post-' + post_id);
  $('#post-' + post_id).find('.post-comments .msg_progress').show();
  comment_id = main_wrapper.find('.comment').last().attr('data-comment-id');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_post_comments',
    post_id: post_id,
    comment_id: comment_id
  }, function (data) {
    if(data.status == 200) {
      main_wrapper.find('.comments-list').append(data.html);
      if (data.no_more == 1) {
        $(self).remove();
      }
	  $('#post-' + post_id).find('.post-comments .msg_progress').hide();
    }
  });
}

// load all post comments
function Wo_loadAllComments(post_id,self) {
  main_wrapper = $('#post-' + post_id);
  $('#post-' + post_id).find('.post-comments .msg_progress').show();
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_comments',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      main_wrapper.find('.comments-list').html(data.html);
      $(self).remove();
      $('#post-' + post_id).find('.post-comments .msg_progress').hide();
    }
  });
}
function Wo_loadAllCommentslightbox(post_id) {
  main_wrapper_light = $('#post-' + post_id);
  view_more_wrapper_light = main_wrapper_light.find('.view-more-wrapper');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_comments',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      $('.comments-list-lightbox').html(data.html);
      $('.view-more-wrapper').remove();
    }
  });
}

// show post comments
function Wo_ShowComments(post_id) {
  $('#post-comments-' + post_id).toggleClass('hidden');
}

// open post edit modal
function Wo_OpenPostEditBox(post_id) {
  var edit_box = $('#post-' + post_id).find('#edit-post');
  edit_box.modal({
    show: true
  });
}
function Wo_OpenOfferEditBox(offer_id) {
  $('.edit_offer_modal_form').empty();
  $.post(Wo_Ajax_Requests_File() + '?f=offer&s=get_offer', {offer_id: offer_id}, function(data, textStatus, xhr) {
    if (data.status == 200) {
      $('.edit_offer_modal_form').html(data.html);
      var edit_box = $('#edit-offer-modal');
      edit_box.modal({
        show: true
      });
    }
  });
  
}
function change_discount(self,offer_id) {
  var type = $(self).val();
  $('.discount_percent_input_'+offer_id).slideUp();
  $('.discount_amount_input_'+offer_id).slideUp();
  $('.buy_get_discount_input_'+offer_id).slideUp();
  $('.spend_get_off_input_'+offer_id).slideUp();
  if (type == 'discount_percent') {
    $('.discount_percent_input_'+offer_id).slideDown();
  }
  else if(type == 'discount_amount'){
          $('.discount_amount_input_'+offer_id).slideDown();
  }
  else if(type == 'buy_get_discount'){
          $('.buy_get_discount_input_'+offer_id).slideDown();
          $('.discount_percent_input_'+offer_id).slideDown();
  }
  else if(type == 'spend_get_off'){
          $('.spend_get_off_input_'+offer_id).slideDown();
  }
}

// save edited post
function Wo_EditPost(post_id) {
  var post = $('#post-' + post_id);
  var edit_box = $('#post-' + post_id).find('#edit-post');
  var edit_textarea = post.find('.edit-textarea-' + post_id + ' textarea');
  var text = edit_textarea.val();
  var post_text = post.find('.post-description p');
  var type = post.attr('data-post-type');
  if (type == 'share') {
    var post_text = post.find('.post-description .edited_text');
  }
  else{
    var post_text = post.find('.post-description p');
  }
  Wo_progressIconLoader(post.find('#edit-post-button'));
  $('#post-' + post_id).find('#edit-post .disable_btn').attr('disabled','disabled');
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=edit_post', {
    post_id: post_id,
    text: text
  }, function (data) {
    if(data.status == 200) {
      post_text.html(data.html);
      edit_box.modal('hide');
    }
    $('#post-' + post_id).find('#edit-post .disable_btn').removeAttr("disabled");
    if (data.can_send == 1) {
        Wo_SendMessages();
    }
  });
}

function DeleteUploadedImageById(name,id) {
  $('#delete_uploaded_image_by_id_'+id).remove();
}
function DeletePostImage(post_id,image_id = 0) {
  if (image_id > 0) {
    $('#edit-post-form-'+post_id).find('#delete_image_by_id_'+image_id).remove();
  }
  else{
    $('#edit-post-form-'+post_id).find('#delete_image_by_id').remove();
  }
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=delete_post_image', {post_id: post_id,image_id: image_id}, function(data, textStatus, xhr) {location.reload();});
}

// open delete post modal
function Wo_OpenPostDeleteBox(post_id) {
  var delete_box = $('#post-' + post_id).find('#delete-post');
  delete_box.modal({
    show: true
  });
}

// delete post
function Wo_DeletePost(post_id) {
	Wo_CloseLightbox();
	var delete_box = $('#post-' + post_id).find('#delete-post');
	var delete_button = delete_box.find('#delete-all-post');
	$('#post-' + post_id).find('#delete-post .disable_btn').attr('disabled','disabled');
	$.get(Wo_Ajax_Requests_File(), {
		f: 'posts',
		s: 'delete_post',
		post_id: post_id
	}, function (data) {
		if(data.status == 200) {
			delete_box.modal('hide');
			$('body').removeClass('modal-open');
			$('#post-' + post_id).slideUp(200, function () {
				$(this).remove();
			});
		}
		$('#post-' + post_id).find('#delete-post .disable_btn').removeAttr("disabled");
	});
}

// open comment textarea
function Wo_OpenCommentEditBox(comment_id) {
  comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('.comment-edit');
  comment_text.slideToggle(100);
}

function Wo_ReportComment( comment_id ){
  if (!comment_id || comment_id <= 0) {
    return false;
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'report_comment',
    comment_id: comment_id
  }, function (data) {
    if(data.status == 200) {
	  $("body").snackbar({
		message: data.text
	  });
      setTimeout(function () {
        $('#reportComment'+comment_id).css({"color":"#F44336"});
      }, 1500);
    }else if(data.status == 300) {
	  $("body").snackbar({
		message: data.text
	  });
      setTimeout(function () {
        $('#reportComment'+comment_id).css({"color":"inherit"});
      }, 1500);
    }
  });

}
// save edited comment
function Wo_EditComment(text, comment_id, event) {
  comment_ = $('#edit_comment_'+comment_id);
  Wo_Get_Mention(comment_);
  comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('.comment-text');
  if(event.keyCode == 13 && event.shiftKey == 0) {
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=edit_comment', {
      comment_id: comment_id,
      text: text
    }, function (data) {
      if(data.status == 200) {
        comment_text.html(data.html);
        Wo_OpenCommentEditBox(comment_id);
      }
    });
  }
}

// delete comment
function Wo_DeleteComment(comment_id) {
  var delete_box = $('[id=comment_' + comment_id + ']').find('#delete-comment');
  var delete_button = delete_box.find('#delete-all-post');
  delete_box.modal({
    show: true
  });
  var comment = $('[id=comment_' + comment_id + ']');
  delete_button.on('click', function () {
    $('[id=comment_' + comment_id + ']').find('#delete-comment .disable_btn').attr('disabled','disabled');
    $.get(Wo_Ajax_Requests_File(), {
      f: 'posts',
      s: 'delete_comment',
      comment_id: comment_id
    }, function (data) {
      if(data.status == 200) {
        delete_box.modal('hide');
        $('.modal').modal('hide');
        comment.fadeOut(300, function () {
          comment.remove();
        });
      }
    });
  });
}

function Wo_DeleteReplyComment(reply_id) {
  var delete_box = $('[id=comment_reply_' + reply_id + ']').find('#delete-comment-reply');
  var delete_button = delete_box.find('#delete-all-reply');
  delete_box.modal({
    show: true
  });
  var comment = $('[id=comment_reply_' + reply_id + ']');
  delete_button.on('click', function () {
    $('[id=comment_reply_' + reply_id + ']').find('#delete-comment-reply .disable_btn').attr('disabled','disabled');
    $.get(Wo_Ajax_Requests_File(), {
      f: 'posts',
      s: 'delete_comment_reply',
      reply_id: reply_id
    }, function (data) {
      if(data.status == 200) {
        delete_box.modal('hide');
        comment.fadeOut(300, function () {
          $(this).remove();
        });
      }
    });
  });
}

// register comment like
function Wo_RegisterCommentLike(comment_id) {
  var comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('div.comment-text').text();
  Wo_progressIconLoader(comment.find('#LikeComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_like', {
    comment_id: comment_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
	  if (node_socket_flow == "1") {
        socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "added" });
      }
      if (data.dislike == 1) {
          comment.find("#comment-wonders").text(data.wonders_c);
          comment.find("#WonderComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>');
      }
      comment.find("#LikeComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up active-like"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-likes").text(data.likes);
    } else {
	  if (node_socket_flow == "1") {
        socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "removed" });
      }
      comment.find("#LikeComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-likes").text(data.likes);
    }
  });
}

// register comment wonder
function Wo_RegisterCommentWonder(comment_id) {
  var comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('div.comment-text').text();
  Wo_progressIconLoader(comment.find('#WonderComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_wonder', {
    comment_id: comment_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
	  if (node_socket_flow == "1") {
        socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "added" });
      }
      if (data.dislike == 1) {
          comment.find("#comment-likes").text(data.likes_c);
          comment.find("#LikeComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>');
      }
      comment.find("#WonderComment").html('<span class="active-wonder">' + data.icon + '</span>').fadeIn(150);
      comment.find("#comment-wonders").text(data.wonders);
    } else if (data.status == 300)  {
	  if (node_socket_flow == "1") {
        socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "removed" });
      }
      comment.find("#WonderComment").html('' + data.icon + '').fadeIn(150);
      comment.find("#comment-wonders").text(data.wonders);
    }
  });
}

// register comment wonder
function Wo_RegisterCommentReplyWonder(reply_id) {
  var comment = $('[id=comment_reply_' + reply_id + ']');
  comment_text = comment.find('div.reply-text').text();
  Wo_progressIconLoader(comment.find('#WonderReplyComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_reply_wonder', {
    reply_id: reply_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
	  if (node_socket_flow == "1") {
        socket.emit("reply_notification", { reply_id: reply_id, user_id: _getCookie("user_id"), type: "added" });
      }
      if (data.dislike == 1) {
          comment.find("#comment-reply-likes").text(data.likes_r);
          comment.find("#LikeReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>');
      }
      comment.find("#WonderReplyComment").html('<span class="active-wonder">' + data.icon + '</span>').fadeIn(150);
      comment.find("#comment-reply-wonders").text(data.wonders);
    } else if (data.status == 300){
	  if (node_socket_flow == "1") {
        socket.emit("reply_notification", { reply_id: reply_id, user_id: _getCookie("user_id"), type: "removed" });
      }
      comment.find("#WonderReplyComment").html('' + data.icon + '').fadeIn(150);
      comment.find("#comment-reply-wonders").text(data.wonders);
    }
  });
}

function Wo_RegisterCommentReplyLike(reply_id) {
  var comment = $('[id=comment_reply_' + reply_id + ']');
  comment_text = comment.find('div.reply-text').text();
  Wo_progressIconLoader(comment.find('#LikeReplyComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_reply_like', {
    reply_id: reply_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
	  if (node_socket_flow == "1") {
        socket.emit("reply_notification", { reply_id: reply_id, user_id: _getCookie("user_id"), type: "added" });
      }
      if (data.dislike == 1) {
          comment.find("#comment-reply-wonders").text(data.wonders_r);
          comment.find("#WonderReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>');
      }
      comment.find("#LikeReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up active-like"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-reply-likes").text(data.likes);
    } else if (data.status == 300){
	  if (node_socket_flow == "1") {
        socket.emit("reply_notification", { reply_id: reply_id, user_id: _getCookie("user_id"), type: "removed" });
      }
      comment.find("#LikeReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-reply-likes").text(data.likes);
    }
  });
}
// save post
function Wo_SavePost(post_id) {
	var post = $('#post-' + post_id);
	post.find('.tag_post_men_disable').show();
	$.get(Wo_Ajax_Requests_File(), {
		f: 'posts',
		s: 'save_post',
		post_id: post_id
	}, function (data) {
		if(data.status == 200) {
			post.find('.save-post').html(data.text);
			post.find('.save-product').toggleClass('active');
		} else if(data.status == 300) {
			post.find('.save-product').toggleClass('active');
			post.find('.save-post').html(data.text);
		}
		post.find('.tag_post_men_disable').hide();
	});
}

// report post
function Wo_ReportPost(post_id) {
	var post = $('#post-' + post_id);
	post.find('.tag_post_men_disable').show();
	$.get(Wo_Ajax_Requests_File(), {
		f: 'posts',
		s: 'report_post',
		post_id: post_id
	}, function (data) {
		if(data.status == 200) {
			post.find('.report-post').html(data.text);
		} else if(data.status == 300) {
			post.find('.report-post').html(data.text);
		}
		post.find('.tag_post_men_disable').hide();
	});
}

function Wo_DisableComment(post_id, type) {
	var post = $('#post-' + post_id);
	if (type == 0 ) {
		post.find('.disable-comments').attr('onclick', 'Wo_DisableComment(' + post_id + ', 1);');
		post.find('.post-comments').show()
	} else {
		post.find('.disable-comments').attr('onclick', 'Wo_DisableComment(' + post_id + ', 0);');
		post.find('.post-comments').hide()
	}
	$.get(Wo_Ajax_Requests_File(), {
		f: 'posts',
		s: 'disable_comment',
		post_id: post_id,
		type: type
	}, function (data) {
		post.find('.disable-comments').html(data.text);
	});
}

function Wo_PinPost(post_id, id, type) {
	var post = $('#post-' + post_id);
	post.find('.tag_post_men_disable').show();
	$.get(Wo_Ajax_Requests_File(), {
		f: 'posts',
		s: 'pin_post',
		post_id: post_id,
		id: id,
		type: type
	}, function (data) {
		if(data.status == 200) {
			post.find('.pin-post').html(data.text);
		} else if(data.status == 300) {
			post.find('.pin-post').html(data.text);
		}
		post.find('.tag_post_men_disable').hide();
	});
}

function Wo_BoostPost(post_id) {
	var post = $('#post-' + post_id);
	post.find('.tag_post_men_disable').show();
	$.get(Wo_Ajax_Requests_File(), {
		f: 'posts',
		s: 'boost_post',
		post_id: post_id
	}, function (data) {
		if(data.status == 200) {
			post.find('.boost-post').html(data.text);
		} else if(data.status == 300) {
			post.find('.boost-post').html(data.text);
		}
		post.find('.tag_post_men_disable').hide();
	});
}

// open post Reacted users
function Wo_OpenPostReactedUsers(post_id, type,col) {
	if (col != 'story') {
    //$('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  }
  if (col == 'story') {
    $('.width_').css('width', $('.width_').css('width'));
    value = $('.story_lightbox').attr('data-post-id');
    $('.story_lightbox').addClass('dont_close_story_'+value);
  }
	
  $('.reacted_users_load_more').css('display', 'inline');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_post_reacted',
    post_id: post_id,
    type: type,
    col:col
  }, function (data) {
    if(data.status == 200) {
		if (col != 'story') {
        setTimeout(function () {
          //$('.lightbox-container').remove();
        },100);
      }
      //$('#views_info_title').html(data.title);
      if(data.html.length == 0) {
        $('.reacted_users_load_more').attr('data-type', '');
        $('#reacted_users_box').html('<div class="empty_state"><svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0" fill="#ffe6e2"/><path d="m271.089844 256 64.109375-64.113281c4.160156-4.160157 4.160156-10.910157 0-15.085938-4.160157-4.175781-10.910157-4.160156-15.085938 0l-64.113281 64.109375-64.113281-64.109375c-4.160157-4.160156-10.910157-4.160156-15.085938 0-4.175781 4.160157-4.160156 10.910157 0 15.085938l64.109375 64.113281-64.109375 64.113281c-4.160156 4.160157-4.160156 10.910157 0 15.085938 2.078125 2.082031 4.816407 3.121093 7.535157 3.121093 2.734374 0 5.457031-1.039062 7.535156-3.121093l64.128906-64.109375 64.113281 64.109375c2.078125 2.082031 4.816407 3.121093 7.535157 3.121093s5.457031-1.039062 7.535156-3.121093c4.160156-4.160157 4.160156-10.910157 0-15.085938zm0 0" fill="#fc573b"/></svg>' + data.message + '</div>');
        $('#reacted_users_load').css('display', 'none');
        $('#users-reacted-modal').modal('show');
      } else {
        $('.reacted_users_load_more').attr('col-type', col);
        $('.reacted_users_load_more').attr('data-type', type);
        $('.reacted_users_load_more').attr('post-id', post_id);
        $('#reacted_users_load').css('display', 'block');
        $('#reacted_users_box').html(data.html);
        $('#users-reacted-modal').modal('show');
      }
    }
  });
}

function Wo_ClosePostReactedUsers(post_id) {
	var post = $('#post-' + post_id);post_likes_container = post.find('.post-reacted');
	post_likes_container.slideUp(200).empty();
}

// open post liked users
function Wo_OpenPostLikedUsers(post_id,table) {
  $('.views_info_load_more').css('display', 'inline');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_post_likes',
    post_id: post_id,
    table:table
  }, function (data) {
    if(data.status == 200) {
      $('#views_info_title').html(data.title);
      if(data.html.length == 0) {
        $('.views_info_load_more').attr('data-type', '');
        $('#views_info').html('<div class="empty_state"><svg height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" fill="#ffe6e2"/><path d="m9.167 13.333c-.644 0-1.167.524-1.167 1.167v7.667c0 .643.523 1.167 1.167 1.167.614-.114 2.833.486 2.833-1.167v-7.667c0-1.669-2.256-1.06-2.833-1.167z" fill="#fd907e"/><path d="m21.334 13.833h-3.147s.5-1 .5-2.667c0-2-1.5-2.667-2.167-2.667s-1 .333-1 2c0 1.584-1.534 2.858-2.521 3.515v8.259c3.298 1.526 7.102 1.171 7.587 1.226 3.367 0 2.679-4.353 3.373-6.547.282-1.632-.972-3.119-2.625-3.119z" fill="#fc573b"/></svg>' + data.message + '</div>');
        $('#views_info_load').css('display', 'none');
        $('#views-info-modal').modal('show');
      } else {
        $('.views_info_load_more').attr('data-type', 'like');
        $('.views_info_load_more').attr('table-type', table);
        $('.views_info_load_more').attr('post-id', post_id);
        $('#views_info_load').css('display', 'block');
        $('#views_info').html(data.html);
        $('#views-info-modal').modal('show');
      }
    }
  });
}

// open post shared users
function Wo_OpenPostSharedUsers(post_id) {
  $('.views_info_load_more').css('display', 'inline');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_post_shared',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      $('#views_info_title').html(data.title);
      if(data.html.length == 0) {
        $('.views_info_load_more').attr('data-type', '');
        $('#views_info').html('<div class="empty_state"><svg height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" fill="#ffe6e2"/><path d="m17.5 8h-7.667c-1.013 0-1.833.82-1.833 1.833v10.333c0 1.014.82 1.834 1.833 1.834h6.407c-.553-.487-.907-1.2-.907-2 0-1.473 1.193-2.667 2.667-2.667.267 0 .513.053.753.12l.58-.327v-7.293c0-1.013-.82-1.833-1.833-1.833zm-6.833 2.667h2.667c.367 0 .667.3.667.667s-.301.666-.668.666h-2.667c-.366 0-.666-.3-.666-.667s.3-.666.667-.666zm3.333 6.666h-3.333c-.367 0-.667-.3-.667-.667s.3-.666.667-.666h3.333c.367 0 .667.3.667.667s-.3.666-.667.666zm2.667-2.666h-6c-.367 0-.667-.3-.667-.667s.3-.667.667-.667h6c.367 0 .667.3.667.667-.001.367-.301.667-.667.667z" fill="#fc573b"/><g fill="#fd907e"><path d="m21.945 22.752c-.083 0-.168-.021-.245-.064l-3.236-1.826c-.241-.136-.326-.441-.19-.681.137-.24.441-.325.681-.19l3.236 1.826c.241.136.326.441.19.681-.092.162-.262.254-.436.254z"/><path d="m18.721 20.086c-.174 0-.342-.09-.435-.252-.137-.24-.053-.545.187-.682l3.224-1.838c.24-.136.546-.053.682.187.137.24.053.545-.187.682l-3.224 1.838c-.078.044-.163.065-.247.065z"/><path d="m22.667 18.667c-.735 0-1.333-.598-1.333-1.333s.597-1.334 1.333-1.334c.735 0 1.333.598 1.333 1.333s-.598 1.334-1.333 1.334z"/><path d="m22.667 24c-.735 0-1.333-.598-1.333-1.333s.598-1.333 1.333-1.333 1.333.598 1.333 1.333-.598 1.333-1.333 1.333z"/><path d="m18 21.333c-.735 0-1.333-.598-1.333-1.333s.598-1.333 1.333-1.333 1.333.598 1.333 1.333-.598 1.333-1.333 1.333z"/></g></svg>' + data.message + '</div>');
        $('#views_info_load').css('display', 'none');
        $('#views-info-modal').modal('show');
      } else {
        $('.views_info_load_more').attr('data-type', 'share');
        $('.views_info_load_more').attr('post-id', post_id);
        $('#views_info_load').css('display', 'block');
        $('#views_info').html(data.html);
        $('#views-info-modal').modal('show');
      }
    }
  });
}


// open post wodered users
function Wo_OpenPostWonderedUsers(post_id,table) {
  $('.views_info_load_more').css('display', 'inline');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_post_wonders',
    post_id: post_id,
    table:table
  }, function (data) {
    if(data.status == 200) {
      $('#views_info_title').html(data.title);
      if(data.html.length == 0) {
        $('.views_info_load_more').attr('data-type', '');
        $('#views_info').html('<div class="empty_state"><svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0" fill="#ffe6e2"/><path d="m271.089844 256 64.109375-64.113281c4.160156-4.160157 4.160156-10.910157 0-15.085938-4.160157-4.175781-10.910157-4.160156-15.085938 0l-64.113281 64.109375-64.113281-64.109375c-4.160157-4.160156-10.910157-4.160156-15.085938 0-4.175781 4.160157-4.160156 10.910157 0 15.085938l64.109375 64.113281-64.109375 64.113281c-4.160156 4.160157-4.160156 10.910157 0 15.085938 2.078125 2.082031 4.816407 3.121093 7.535157 3.121093 2.734374 0 5.457031-1.039062 7.535156-3.121093l64.128906-64.109375 64.113281 64.109375c2.078125 2.082031 4.816407 3.121093 7.535157 3.121093s5.457031-1.039062 7.535156-3.121093c4.160156-4.160157 4.160156-10.910157 0-15.085938zm0 0" fill="#fc573b"/></svg>' + data.message + '</div>');
        $('#views_info_load').css('display', 'none');
        $('#views-info-modal').modal('show');
      } else {
        $('.views_info_load_more').attr('data-type', 'wonder');
        $('.views_info_load_more').attr('table-type', table);
        $('.views_info_load_more').attr('post-id', post_id);
        $('#views_info_load').css('display', 'block');
        $('#views_info').html(data.html);
        $('#views-info-modal').modal('show');
      }
    }
  });
}


// add emo to input
function Wo_AddEmo(code, input) {
  inputTag = $(input);
  inputVal = inputTag.val();
  if(typeof (inputTag.attr('placeholder')) != "undefined") {
    inputPlaceholder = inputTag.attr('placeholder');
    if(inputPlaceholder == inputVal) {
      inputTag.val('');
      inputVal = inputTag.val();
    }
  }
  if(inputVal.length == 0) {
    inputTag.val(code + ' ');
  } else {
    inputTag.val(inputVal + ' ' + code);
  }
  inputTag.keyup();
}

// accept follow request
function Wo_AcceptFollowRequest(user_id) {
  var main_container = $('.user-follow-request-' + user_id);
  var follow_main_container = main_container.find('#accept-' + user_id);
  follow_main_container.attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'accept_follow_request',
    following_id: user_id
  }, function (data) {
    if(data.status == 200) {
      main_container.find('.accept-btns').html(data.html);
    }
  });
}

function Wo_DeleteFollowGroupRequest(group_id) {
  var main_container = $('.user-group-request-' + group_id);
  var follow_main_container = main_container.find('#delete-' + group_id);
  follow_main_container.attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'chat',
    s: 'delete_group_request',
    group_id: group_id
  }, function (data) {
    if(data.status == 200) {
      main_container.remove();
    }
  });
}

function Wo_AcceptFollowGroupRequest(group_id) {
  var main_container = $('.user-group-request-' + group_id);
  var follow_main_container = main_container.find('#accept-' + group_id);
  follow_main_container.attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'chat',
    s: 'accept_group_request',
    group_id: group_id
  }, function (data) {
    if(data.status == 200) {
      main_container.remove();
    }
  });
}

function Wo_StartRepositioner() {
    $('.user-cover-reposition-w').hide();
    $('.user-reposition-container').show();
    $('.cover-resize-buttons').show();
    $('.default-buttons').hide();
    $('.when-notedit').hide();
    $('.when-edit').show();
    $('.user-reposition-dragable-container').show();
    $('.profile-cover-changer').show();
  $('.wo_user_profile .card.hovercard .pic-info-cont, .problackback').fadeOut();
    $('.screen-width').val($('.user-reposition-container').width());
    $('.user-reposition-container img').css('cursor', '-webkit-grab').draggable({
        scroll: false,
        axis: "y",
        cursor: "-webkit-grab",
        drag: function (event, ui) {
            y1 = $('.user-cover-reposition-container').height();
            y2 = $('.user-reposition-container').find('img').height();
            if (ui.position.top >= 0) {
                ui.position.top = 0;
            }else
                if (ui.position.top <= (y1-y2)) {
                    ui.position.top = y1-y2;
                }
            },
            stop: function(event, ui) {
                $('input.cover-position').val(ui.position.top);
            }
        });
}

function Wo_SubmitRepositioner() {
    if ($('input.cover-position').length == 1) {
        posY = $('input.cover-position').val();
        $('form.cover-position-form').submit();
    }
}

function Wo_StopRepositioner() {
    $('.when-notedit').show();
    $('.when-edit').hide();
    $('.user-cover-reposition-w').show();
    $('.user-reposition-container').hide();
    $('.cover-resize-buttons').hide();
    $('.default-buttons').show();
    $('input.cover-position').val(0);
  $('.wo_user_profile .card.hovercard .pic-info-cont, .problackback').fadeIn();
    $('.user-reposition-container img').draggable('destroy').css('cursor','default');
}
// delete follow request
function Wo_DeleteFollowRequest(user_id) {
  var main_container = $('.user-follow-request-' + user_id);
  var follow_main_container = main_container.find('#delete-' + user_id);
  follow_main_container.attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'delete_follow_request',
    following_id: user_id
  }, function (data) {
    if(data.status == 200) {
      main_container.remove();
      //main_container.find('.accept-btns').html(data.html);
    }
  });
}

// update post privacy
function Wo_UpdatePostPrivacy(post_id, privacy_type, event) {
  var post = $('#post-' + post_id);
  event.preventDefault();
  var post_privacy_container = post.find('.post-privacy');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'update_post_privacy',
    post_id: post_id,
    privacy_type: privacy_type
  }, function (data) {
    if(data.status == 200) {
      if(data.privacy_type == 0) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" opacity=".8"><path fill="currentColor" d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>');
      } else if(data.privacy_type == 1) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" opacity=".8"><path fill="currentColor" d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z"></path></svg>');
      } else if(data.privacy_type == 2) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" opacity=".8"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"></path></svg>');
      } else if(data.privacy_type == 3) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" opacity=".8"><path fill="currentColor" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"></path></svg>');
      } else if(data.privacy_type == 4) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" opacity=".8"><path fill="currentColor" d="M12,3C9.31,3 7.41,4.22 7.41,4.22L6,9H18L16.59,4.22C16.59,4.22 14.69,3 12,3M12,11C9.27,11 5.39,11.54 5.13,11.59C4.09,11.87 3.25,12.15 2.59,12.41C1.58,12.75 1,13 1,13H23C23,13 22.42,12.75 21.41,12.41C20.75,12.15 19.89,11.87 18.84,11.59C18.84,11.59 14.82,11 12,11M7.5,14A3.5,3.5 0 0,0 4,17.5A3.5,3.5 0 0,0 7.5,21A3.5,3.5 0 0,0 11,17.5C11,17.34 11,17.18 10.97,17.03C11.29,16.96 11.63,16.9 12,16.91C12.37,16.91 12.71,16.96 13.03,17.03C13,17.18 13,17.34 13,17.5A3.5,3.5 0 0,0 16.5,21A3.5,3.5 0 0,0 20,17.5A3.5,3.5 0 0,0 16.5,14C15.03,14 13.77,14.9 13.25,16.19C12.93,16.09 12.55,16 12,16C11.45,16 11.07,16.09 10.75,16.19C10.23,14.9 8.97,14 7.5,14M7.5,15A2.5,2.5 0 0,1 10,17.5A2.5,2.5 0 0,1 7.5,20A2.5,2.5 0 0,1 5,17.5A2.5,2.5 0 0,1 7.5,15M16.5,15A2.5,2.5 0 0,1 19,17.5A2.5,2.5 0 0,1 16.5,20A2.5,2.5 0 0,1 14,17.5A2.5,2.5 0 0,1 16.5,15Z"></path></svg>');
      } else {
        return false;
      }
    }
  });
}

// open chat tab
function Wo_OpenChatTab(recipient_id, group_id,product_id = 0,page_id = 0,page_user_id = 0,story_id = 0) {

  if ($(".chat_"+recipient_id).length > 0 && story_id == 0) {
	  SendSeen(recipient_id);
    $('.chat_'+recipient_id).find('.online-toggle-hdr').attr('style', '');
    return false;
  }

  if(group_id != 0){
    $("#group_tab_" + group_id).find('.group-lastseen').empty();
  }
  if (group_id == null) {
    group_id = 0;
  }
  if (story_id != 0) {
    Wo_CloseLightbox();
  }
  
  if(node_socket_flow === "0"){
    $.get(Wo_Ajax_Requests_File(), {
      f: 'chat',
      s: 'is_chat_on',
      recipient_id: recipient_id,
      story_id: story_id
    }, function (data) {
	  length = 0;
      if ($('body').attr('chat-off')) {
      length = $('body').attr('chat-off').length;
      }
      if(current_width < 768 || length > 0) {
        if (page_id > 0) {
          document.location = websiteUrl+"/messages/"+page_user_id+"&page="+page_id;
        }
        else{
          document.location = data.url;
        }
        return false;
      }
      if(data.chat != 1 && group_id === 0) {
        document.location = data.url;
        return false;
      }
    });
  }
  if(current_width < 768) {
    $.get(Wo_Ajax_Requests_File(), {
      f: 'chat',
      s: 'close_chat',
      recipient_id: recipient_id,
      story_id: story_id
    }, function (data) {
      //document.location = data.url;
    });
    return false;
  }
  placement = 1;
  if ($('.chat-wrapper').length == 1) {
    placement = 2;
  } else if ($('.chat-wrapper').length == 2) {
    placement = 3;
  }
  var loading_icon = '<svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#fff" fill="none" stroke-width="11" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg>';
  $('#online_' + recipient_id).find('.new-message-alert').html('0').hide();
  if (group_id) {
    var loading_div = $('.chat-container').find('#group_tab_' + group_id).find('.chat-loading-icon');
  }else{
    var loading_div = $('.chat-container').find('#online_' + recipient_id).find('.chat-loading-icon');
  }
  
  loading_div.html(loading_icon);
  chat_container = $('.chat-container');
  $(document.body).attr('data-chat-recipient-'+recipient_id, recipient_id);
  $('.chat-wrapper').show();
  /* var data_html = '<div class="chat-wrapper" id="chat_"><div class="online-toggle pointer" onclick="javascript:$(\'.chat-tab-container\').slideToggle(100);"><a style="color:#fff;" href=""><span class="chat-tab-status">......</span></a></div><div class="chat-tab-container"><div class="chat-messages-wrapper"><div class="chat-messages"></div><div class="clear"></div></div><div class="chat-textarea btn-group"><div class="emo-container"></div><form action="#" method="post" class="chat-sending-form"><textarea name="textSendMessage" disabled id="sendMessage" class="form-control" cols="10" rows="5" placeholder=""  onkeydown="Wo_SubmitChatForm(event);" onfocus="Wo_SubmitChatForm(event);" dir="auto"></textarea><input type="hidden" id="user-id" name="user_id" value="" /></form></div></div></div>';
  $('.chat-tab').append('<span class="chat_main chat_main_"></span>');
  $('.chat_main_').append(data_html); */
  $.get(Wo_Ajax_Requests_File(), {
    f: 'chat',
    s: 'load_chat_tab',
    recipient_id: recipient_id,
    placement:placement,
    group_id:group_id,
    page_id:page_id,
    page_user_id:page_user_id,
    story_id:story_id
  }, function (data) {
    if(data.status == 200) {
      if ($('.chat-wrapper').length == 3) {
         if ($('.chat_main_' + recipient_id).length == 0) {
            $('.chat_main:first-child').remove();
            $('.chat-tab').append('<span class="chat_main chat_main_' + recipient_id +'"></span>');
         } else {
            $('.chat_main_' + recipient_id).remove();
         }
         $('.chat_main_' + recipient_id).html(data.html);
      } else {
        if ($('.chat_main_' + recipient_id).length > 0) {
          $('.chat_main_' + recipient_id).html(data.html);
        } else {
          $('.chat-tab').append('<span class="chat_main chat_main_' + recipient_id +'"></span>');
          $('.chat_main_' + recipient_id).append(data.html);
        }
      }
      if (page_id > 0) {
        setTimeout(function () {

          $('.page-messages-wrapper-'+page_id).scrollTop($('.page-messages-wrapper-'+page_id)[0].scrollHeight);

        }, 1000);
        
      }
      $('.chat-wrapper').show();
      loading_div.empty();
      $('.chat-textarea textarea').keyup();
      if (group_id == 0 && page_id == 0) {
        $.get(Wo_Ajax_Requests_File(), {
          f: 'chat',
          s: 'load_chat_messages',
          recipient_id: recipient_id,
          product_id: product_id
        }, function (data) {
			Wo_intervalUpdates();
          if (data.messages.length > 0) {
             $('.chat-tab').find('.chat_' + recipient_id).find('.chat-messages').html(data.messages);
          } else {
            $('.chat_' + recipient_id).find('.chat-user-desc').addClass('chat-user-desc-show');
          }
		  if (node_socket_flow === "1") {
            var chat_container = $('.chat-tab').find('.chat_main_' + recipient_id);
            var last_id = chat_container.find('.messages-text:last').attr('data-message-id');
            socket.emit("is_chat_on", {
              message_id: last_id,
              user_id: _getCookie("user_id"),
              recipient_id: recipient_id
            })
          }
		  if ($('.chat-messages-wrapper').length > 0) {
            setTimeout(function () {
              $('.chat-messages-wrapper').scrollTop($('.chat-messages-wrapper')[0].scrollHeight);
            }, 1000);
          }
		  if (node_socket_flow == "1") {
            socket.emit("count_unseen_messages", { user_id: _getCookie("user_id") });
          }
        });
      }else if(group_id!==0){
        if (node_socket_flow === "1") {
          var chat_container = $('.chat-tab').find('.chat_main_' + group_id);
          var last_id = chat_container.find('.messages-text:last').attr('data-message-id');
          socket.emit("is_chat_on", {
            message_id: last_id,
            user_id: _getCookie("user_id"),
            recipient_id: group_id,
            isGroup: true
          })
        }
      }
    }
  });
}

function Wo_SearchForPosts(query) {
  var type = '';
  if ($('.page-margin').attr('data-page') == "timeline") {
    type = 'user';
  } else if ($('.page-margin').attr('data-page') == "page"){
    type = 'page';
  } else if ($('.page-margin').attr('data-page') == "group") {
    type = 'group'
  } else {
    return false;
  }
  Wo_progressIconLoader($('.search-for-posts-container'));
  var id = $('.page-margin').attr('data-id');
  if (id == null || id == "undefined") {
    return false;
  }
  $.get(Wo_Ajax_Requests_File(), {f:'posts', s:'search_for_posts', id: id, search_query: query, type: type}, function (data) {
     if (data.status == 200) {
        $('#posts').html(data.html);
     }
     Wo_progressIconLoader($('.search-for-posts-container'));
  });
}

function Wo_Fetch(id, post_id) {
   var clickedOnBody = true;
   var user_from_post_id = '#post-' + post_id;
   var user_from_image = '#post-' + post_id + ' .post-heading';
   var div = '.user-fetch-post-' + post_id + '-user-' + id;
   var bla = user_from_post_id + ', ' + div;
   clearTimeout(timeout);
   $(div).fadeIn(200);  
   var timeout;
   function hidepanel() {
     $(div).fadeOut(0); 
   }
    $(div).mouseleave(doTimeout);
    $(user_from_image).mouseleave(doTimeout);
     function doTimeout(){
        clearTimeout(timeout);
        timeout = setTimeout(hidepanel, 0);
     }
}

function Wo_RequestVerification(id, type) {
  $.get(Wo_Ajax_Requests_File(), {f:'request_verification', id:id, type:type}, function(data) {
    if (data.status == 200) {
      $('#verification-request').html(data.html);
    }
  });
}

function Wo_DeleteUserVerification(id, type) {
  if (confirm("Are you sure ?") == false) {
      return false;
  }
  $.get(Wo_Ajax_Requests_File(), {f:'delete_verification', id:id, type:type}, function(data) {
    if (data.status == 200) {
      $('#verification-request').html(data.html);
    }
  });
}

function Wo_RemoveVerification(id, type) {
  $.get(Wo_Ajax_Requests_File(), {f:'remove_verification', id:id, type:type}, function(data) {
    if (data.status == 200) {
      $('#verification-request').html(data.html);
    }
  });
}

$('body').on('mouseenter', '.user-popover', function() {
    var popover = $(this);
    var type = popover.attr('data-type');
    var id = popover.attr('data-id');
    var placement = popover.attr('data-placement') || 'none';
    var placement_code = 'user-details not-profile';
    if (placement == 'profile') {
      placement_code = 'user-details';
    }
    var over_time = setTimeout(function() {
       var offset = popover.offset();
       var posY = (offset.top - $(window).scrollTop()) + popover.height();
       var posX = offset.left - $(window).scrollLeft();
       var available = $(window).width() - posX;
       if ($(window).width() > 800) {
       if (available < 400) {
         var right = available - popover.width();
         if (posY > 0) {
          $('body').append('<div class="' + placement_code + ' right" style="position: fixed; top: ' + posY + 'px; right:' + right + 'px"><div class="loading-user"><div class="skel tag_pop_skel_cover"></div><div class="valign tag_profile_popover"><div class="user-avatar"><div class="skel skel_50"></div></div><div class="full_width"><div class="skel skel_2 skel_noti_name"></div><div class="skel skel_2 skel_noti_time"></div><div class="skel skel_2 skel_noti_time"></div></div></div></div></div>');
         }
       } else {
        if (posY > 0) {
         $('body').append('<div class="' + placement_code + '" style="position: fixed; top: ' + posY + 'px; left:' + posX + 'px"><div class="loading-user"><div class="skel tag_pop_skel_cover"></div><div class="valign tag_profile_popover"><div class="user-avatar"><div class="skel skel_50"></div></div><div class="full_width"><div class="skel skel_2 skel_noti_name"></div><div class="skel skel_2 skel_noti_time"></div><div class="skel skel_2 skel_noti_time"></div></div></div></div></div>');
        }
       }
       }
       $.get(Wo_Ajax_Requests_File(), {f:'popover', id:id, type:type}, function(data) {
         if (data.status == 200) {
             $('.user-details').html(data.html);
         }
       });
    }, 1000);
    popover.data('timeout', over_time);
});

$('body').on('mouseleave', '.user-popover', function(e) {
    var to = e.toElement || e.relatedTarget;
      if (!$(to).is(".user-details")) {
        clearTimeout($(this).data('timeout'));
        $('.user-details').remove();
      }
});
$('body').on('mouseleave', '.user-details', function() {
    $('.user-details').remove();
});
function Wo_OpenAlbumLightBox(image_id, type) {
  $('body').addClass('no_scroll');
  $('body').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'open_album_lightbox', image_id:image_id, type:type}, function(data) {
    if (data.status == 200) {
	  $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
    }
    if (data.html.length == 0) {
	   $('body').removeClass('no_scroll');
    }
  });
}
function Wo_CloseLightbox() {
  $('.lightbox-container').remove();
  $('body').removeClass('no_scroll');
}
function Wo_OpenLightBox(post_id) {
  $('body').addClass('no_scroll');
  $('#contnet').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div><div class="tag_lboxside_skel_white"><div class="valign"><div class="skel skel_50 skel_avatar"></div><div><div class="skel skel_2 skel_noti_name"></div><div class="skel skel_2 skel_noti_time"></div></div></div><hr class="style-two tag_lbox_skel_hr"><div class="valign tag_lbox_skel_foot"><div class="skel skel_50 skel_avatar"></div><div class="skel skel_2 tag_lbox_skel_tbox"></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'open_lightbox', post_id:post_id}, function(data) {
    if (data.status == 200) {
	  $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
    }
    if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}
function Wo_OpenMultiLightBox(url) {
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.post(Wo_Ajax_Requests_File() + '?f=open_multilightbox', {url:url}, function(data) {
    if (data.status == 200) {
      $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
    }
    if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}
function Wo_NextAlbumPicture(post_id, id) {
  Wo_CloseLightbox();
  $('body').addClass('no_scroll');
  $('body').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_next_album_image', post_id:post_id, after_image_id:id}, function(data) {
    if (data.status == 200) {
      $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
    if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}
function Wo_PreviousAlbumPicture(post_id, id) {
  Wo_CloseLightbox();
  $('body').addClass('no_scroll');
  $('body').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_previous_album_image', post_id:post_id, before_image_id:id}, function(data) {
    if (data.status == 200) {
      $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
    if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}

function Wo_NextPicture(post_id) {
  var id = 0;
  var type = 'none';
  if(typeof ($('[data-page=timeline]').attr('data-id')) == "string") {
    id = $('[data-page=timeline]').attr('data-id');
    type = 'profile';
  } else if(typeof ($('[data-page=page]').attr('data-id')) == "string") {
    id = $('[data-page=page]').attr('data-id');
    type = 'page';
  } else if (typeof ($('[data-page=group]').attr('data-id')) == "string") {
    id = $('[data-page=group]').attr('data-id');
    type = 'group';
  }
   Wo_CloseLightbox();
   $('body').addClass('no_scroll');
   $('body').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div><div class="tag_lboxside_skel_white"><div class="valign"><div class="skel skel_50 skel_avatar"></div><div><div class="skel skel_2 skel_noti_name"></div><div class="skel skel_2 skel_noti_time"></div></div></div><hr class="style-two tag_lbox_skel_hr"><div class="valign tag_lbox_skel_foot"><div class="skel skel_50 skel_avatar"></div><div class="skel skel_2 tag_lbox_skel_tbox"></div></div></div></div></div>');
   $.get(Wo_Ajax_Requests_File(), {f:'get_next_image', post_id:post_id, type:type, id:id}, function(data) {
    if (data.status == 200) {
	  $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
      $( ".changer" ).fadeIn(200);
    }
    if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}

function Wo_PreviousPicture(post_id) {
  var id = 0;
  var type = 'none';
  if(typeof ($('[data-page=timeline]').attr('data-id')) == "string") {
    id = $('[data-page=timeline]').attr('data-id');
    type = 'profile';
  } else if(typeof ($('[data-page=page]').attr('data-id')) == "string") {
    id = $('[data-page=page]').attr('data-id');
    type = 'page';
  } else if (typeof ($('[data-page=group]').attr('data-id')) == "string") {
    id = $('[data-page=group]').attr('data-id');
    type = 'group';
  }
  Wo_CloseLightbox();
  $('body').addClass('no_scroll');
  $('body').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div><div class="tag_lboxside_skel_white"><div class="valign"><div class="skel skel_50 skel_avatar"></div><div><div class="skel skel_2 skel_noti_name"></div><div class="skel skel_2 skel_noti_time"></div></div></div><hr class="style-two tag_lbox_skel_hr"><div class="valign tag_lbox_skel_foot"><div class="skel skel_50 skel_avatar"></div><div class="skel skel_2 tag_lbox_skel_tbox"></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_previous_image', post_id:post_id, type:type, id:id}, function(data) {
    if (data.status == 200) {
	  $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
      $( ".changer" ).fadeIn(200);
    }
    if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}

function Wo_AcceptJoinGroup(user_id, group_id) {
  $.get(Wo_Ajax_Requests_File(), {f:'groups', s:'accept_request', user_id:user_id, group_id:group_id}, function(data) {
    if (data.status == 200) {
	  if (node_socket_flow == "1") {
         socket.emit("user_notification", { to_id: user_id, user_id: _getCookie("user_id"), type: "added" });
      }
      $('#request-' + user_id).fadeOut(300, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_DeleteJoinGroup(user_id, group_id) {
  $.get(Wo_Ajax_Requests_File(), {f:'groups', s:'delete_request', user_id:user_id, group_id:group_id}, function(data) {
    if (data.status == 200) {
	  if (node_socket_flow == "1") {
         socket.emit("user_notification", { to_id: user_id, user_id: _getCookie("user_id"), type: "added" });
      }
      $('#request-' + user_id).fadeOut(300, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_DeleteJoinedUser(user_id, group_id) {
  $.get(Wo_Ajax_Requests_File(), {f:'groups', s:'delete_joined_user', user_id:user_id, group_id:group_id}, function(data) {
    if (data.status == 200) {
      $('#member-' + user_id).fadeOut(300, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_OpenReplyBox(id) {
  Wo_ViewMoreReplies(id);
   $('#comment_' + id).find('.comment-replies').slideDown(50, function () {
     $('#comment_' + id).find('.comment-reply').slideDown(50);
   });
}
// register post comment
function Wo_RegisterReply(text, comment_id, user_id, event, page_id, type) {
  if(event.keyCode == 13 && event.shiftKey == 0) {
    comment_wrapper = $('[id=comment_' + comment_id + ']');
    reply_textarea = comment_wrapper.find('.comment-replies');
    textarea_wrapper = reply_textarea.find('.textarea');
    reply_list = comment_wrapper.find('.comment-replies-text');
    var comment_src_image = $('#comment_src_image_'+comment_id);
    var comment_image = '';
    if (comment_src_image.length > 0) {
      comment_image = comment_src_image.val();
    }      
    
    if(text == '' && comment_image == '') {
      return false;
    }
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_reply', {
      comment_id: comment_id,
      text: text,
      user_id: user_id,
      page_id: page_id,
      comment_image: comment_image
    }, function (data) {
	  textarea_wrapper.val('').css("cssText", "height: 32px;");
      if(data.status == 200) {
		if (node_socket_flow == "1") {
          socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "added", for: "replies" });
        }
        if (data.mention.length > 0 && node_socket_flow == "1") {
          $.each(data.mention, function( index, value ) {
            socket.emit("user_notification", { to_id: value, user_id: _getCookie("user_id")});
          });
        }
        $('.comment-image-con').empty();
        $('#comment_src_image_'+comment_id).val('');
        $('#comment_src_image_'+comment_id).val('');
        $('#comment_reply_image_' + comment_id).val('');
        Wo_OpenReplyBox(comment_id);
        comment_wrapper.find('.reply-container:last-child').after(data.html);
        comment_wrapper.find('[id=comment-replies]').html(data.replies_num);
      }
    });
  }
}
// register post comment
function Wo_RegisterReply2(comment_id, user_id, page_id, type,gif_url = '') {
	$('.chat-box-stickers-cont').html('');
  $('#gif-form-'+comment_id).slideUp(200);
    comment_wrapper = $('[id=comment_' + comment_id + ']');
    text = $('#comment_'+comment_id).find('.comment-reply-textarea').val();

    reply_textarea = comment_wrapper.find('.comment-replies');
    textarea_wrapper = reply_textarea.find('.textarea');
    reply_list = comment_wrapper.find('.comment-replies-text');
    var comment_src_image = $('#comment_src_image_'+comment_id);
    var comment_image = '';
    if (comment_src_image.length > 0) {
      comment_image = comment_src_image.val();
    }      
    
    if(text == '' && comment_image == '' && gif_url == '') {
      return false;
    }
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_reply', {
      comment_id: comment_id,
      text: text,
      user_id: user_id,
      page_id: page_id,
      comment_image: comment_image,
      gif_url: gif_url
    }, function (data) {
		if (node_socket_flow == "1") {
          socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "added", for: "replies" });
        }
        if (data.mention.length > 0 && node_socket_flow == "1") {
          $.each(data.mention, function( index, value ) {
            socket.emit("user_notification", { to_id: value, user_id: _getCookie("user_id")});
          });
        }
      textarea_wrapper.val('');
      if(data.status == 200) {
        $('.comment-image-con').empty();
        $('#comment_src_image_'+comment_id).val('');
        $('#comment_src_image_'+comment_id).val('');
        $('#comment_reply_image_' + comment_id).val('');
        Wo_OpenReplyBox(comment_id);
        comment_wrapper.find('.reply-container:last-child').after(data.html);
        comment_wrapper.find('[id=comment-replies]').html(data.replies_num);
      }
    });
}

function Wo_ViewMoreReplies(comment_id) {
  main_wrapper = $('[id=comment_' + comment_id + ']');
  view_more_wrapper = main_wrapper.find('.view-more-replies');
  Wo_progressIconLoader(view_more_wrapper);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_replies',
    comment_id: comment_id
  }, function (data) {
    if(data.status == 200) {
      main_wrapper.find('.comment-replies-text').html(data.html);
      main_wrapper.find('.comment-reply').fadeIn(100);
      view_more_wrapper.remove();
    }
  });
}

function Wo_RegsiterRecent(id, type) {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'register_recent_search',
    id: id,
    type:type
  }, function (data) {
    if(data.status == 200) {
      window.location.href = data.href;
    }
  });
} 

function Wo_RemoveAlbumImage(post_id, id) {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'delete_album_image',
    id: id,
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      $('#post-' + post_id).find('#image-' + id).fadeOut(200, function () {
        $(this).remove();
      });
	  $('div[data_image_parent="image-' + post_id + '"]').remove();
    }
  });
}

function Wo_RegisterInvite(user_id, page_id) {
  Wo_progressIconLoader($('#invite-' + user_id).find('button'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'register_page_invite',
    user_id: user_id,
    page_id: page_id
  }, function (data) {
    if(data.status == 200) {
	  if (node_socket_flow == "1") {
         socket.emit("user_notification", { to_id: user_id, user_id: _getCookie("user_id"), type: "added" });
      }
      $('#invite-' + user_id).fadeOut(200, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_RegisterAddGroup(user_id, group_id) {
  Wo_progressIconLoader($('#add-' + user_id).find('button'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'register_group_add',
    user_id: user_id,
    group_id: group_id
  }, function (data) {
    if(data.status == 200) {
	  if (node_socket_flow == "1") {
         socket.emit("user_notification", { to_id: user_id, user_id: _getCookie("user_id"), type: "added" });
      }
      $('#add-' + user_id).fadeOut(200, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_SkipStep(type) {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'skip_step',
    type: type
  }, function (data) {
    if(data.status == 200) {
     window.location.reload();
    }
  });
}
function Wo_AddEmoToCommentInput(post_id, code, type) {
    inputTag = $('[id=post-' + post_id + ']').find('.comment-textarea');
    if (type == 'lightbox-post-footer') {
       inputTag = $('.lightbox-post-footer').find('.comment-textarea');
    }
    inputVal = inputTag.val();
    if (typeof(inputTag.attr('placeholder')) != "undefined") {
        inputPlaceholder = inputTag.attr('placeholder');
        if (inputPlaceholder == inputVal) {
            inputTag.val('');
            inputVal = inputTag.val();
        }
    }
    if (inputVal.length == 0) {
        inputTag.val(code + ' ');
    } else {
        inputTag.val(inputVal + ' ' + code);
    }
    inputTag.keyup().focus();
}
function Wo_SendMessages() {
  $.get(Wo_Ajax_Requests_File(), {f: 'send_mails'});
}
// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function Wo_NotifyMe(icon, title, notification_text, url) {
  if (!Notification) {
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification(title, {
      icon: icon,
      body: notification_text,
    });
    
    notification.onclick = function () {
      window.open(url);
      notification.close();
      Wo_OpenNotificationsMenu();    
    };
  }
}
function Wo_CheckForCallAnswer(id) {
  $.get(Wo_Ajax_Requests_File(), {f:'check_for_answer', id:id}, function (data1) {
    if (data1.status == 200) {
      clearTimeout(checkcalls);
	  $('#calling-modal').find('p').html(data1.text_answered + ". " + data1.text_please_wait);
      setTimeout(function () {
          window.location.href = data1.url;
      }, 1000);
      return false;
    } else if (data1.status == 400) {
      clearTimeout(checkcalls);
      Wo_PlayAudioCall('stop');
	  $('#calling-modal').find('p').html(data1.text_call_declined + ". " + data1.text_call_declined_desc);
    }
    checkcalls = setTimeout(function () {
        Wo_CheckForCallAnswer(id);
    }, 2000);
  });
}

function Wo_CheckForAudioCallAnswer(id) {
  $.get(Wo_Ajax_Requests_File(), {f:'check_for_audio_answer', id:id}, function (data1) {
    if (data1.status == 200) {
      clearTimeout(checkcalls);
	  $('#calling-modal').find('p').html(data1.text_answered + ". " + data1.text_please_wait);
      Wo_PlayAudioCall('stop');
      setTimeout(function () {
          $( '#calling-modal' ).remove();
          $( '.modal-backdrop' ).remove();
          $( 'body' ).removeClass( "modal-open" );
          $('body').append(data1.calls_html);
          $('#re-talking-modal').modal({
            show: true
          });
      }, 3000);
    } else if (data1.status == 400) {
      clearTimeout(checkcalls);
      Wo_PlayAudioCall('stop');
	  $('#calling-modal').find('p').html(data1.text_call_declined + ". " + data1.text_call_declined_desc);
    } else {
      checkcalls = setTimeout(function () {
        Wo_CheckForAudioCallAnswer(id);
      }, 2000);
    }
  });
}

function Wo_AnswerCall(id, url, type) {
  type1 = 'video';
  if (type == 'video') {
     type1 = 'video';
  } else if (type == 'audio') {
    type1 = 'audio';
  }
  $('#re-calling-modal').find('.btn').attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {f:'answer_call', id:id, type:type1}, function (data) {
    Wo_PlayVideoCall('stop');
    if (type1 == 'video') {
      if (data.status == 200) {
         window.location.href = url;
      }
    } else {
      $( '#re-calling-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open" );
	  $('body').removeClass('tag_call_incoming');
      $('body').append(data.calls_html);
      $('#re-talking-modal').modal({
        show: true
      });
    }
  });
}
function Wo_DeclineCall(id, url, type) {
  type1 = 'video';
  if (type == 'video') {
     type1 = 'video';
  } else if (type == 'audio') {
    type1 = 'audio';
  }
  $('#re-calling-modal').find('.btn').attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {f:'decline_call', id:id, type:type1}, function (data) {
    if (data.status == 200) {
      Wo_PlayVideoCall('stop');
      $( '#re-calling-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open" );
	  $('body').removeClass('tag_call_incoming');
    }
  });
}

function Wo_CloseCall(id) {
  $('#re-talking-modal').find('.decline-call').attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {f:'close_call', id:id}, function (data) {
    if (data.status == 200) {
      $( '#re-talking-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open");
    }
  });
}

function Wo_CancelCall() {
  $('#calling-modal').find('.cancel-call').attr('disabled','disabled');
  $.get(Wo_Ajax_Requests_File(), {f:'cancel_call'}, function (data) {
    if (data.status == 200) {
      Wo_PlayAudioCall('stop');
      $( '#calling-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open" );
    }
  });
}
function Wo_GenerateVideoCall(user_id1, user_id2) {
  $.get(Wo_Ajax_Requests_File(), {f:'create_new_video_call', 'new': 'true', user_id1: user_id1, user_id2:user_id2}, function(data) {
      if (data.status == 200) {
		  if (node_socket_flow == "1") { 
            socket.emit("user_notification", { to_id: user_id2, user_id: _getCookie("user_id"), type: "create_video" });
          }
          $('body').append(data.html);
           $('#calling-modal').modal({
             show: true
           });
           checkcalls = setTimeout(function () {
              Wo_CheckForCallAnswer(data.id);
           }, 2000);
           setTimeout(function() {
            $('#calling-modal').find('p').html(data.text_no_answer + ". " + data.text_please_try_again_later);
			$('#calling-modal').find('.btn').addClass('call_no_answer').html('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>');
            clearTimeout(checkcalls);
            Wo_PlayAudioCall('stop');
           }, 43000);
          Wo_PlayAudioCall('play');
    }
   });
}

function Wo_GenerateVoiceCall(user_id1, user_id2) {
  $.get(Wo_Ajax_Requests_File(), {f:'create_new_audio_call', 'new': 'true', user_id1: user_id1, user_id2:user_id2}, function(data) {
      if (data.status == 200) {
		  if (node_socket_flow == "1") { 
            socket.emit("user_notification", { to_id: user_id2, user_id: _getCookie("user_id"), type: "create_video" });
          }
          $('body').append(data.html);
           $('#calling-modal').modal({
             show: true
           });
           checkcalls = setTimeout(function () {
              Wo_CheckForAudioCallAnswer(data.id);
           }, 2000);
           setTimeout(function() {
            $('#calling-modal').find('p').html(data.text_no_answer + ". " + data.text_please_try_again_later);
			$('#calling-modal').find('.btn').addClass('call_no_answer').html('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>');
            clearTimeout(checkcalls);
            Wo_PlayAudioCall('stop');
           }, 43000);
          Wo_PlayAudioCall('play');
    }
   });
}

function Wo_PlayAudioCall(type) {
  if (type == 'play') {
    document.getElementById('calling-sound').play();
    playmusic_ = setTimeout(function() {
       Wo_PlayAudioCall('play');
    }, 100);
  } else {
    clearTimeout(playmusic_);
    document.getElementById('calling-sound').pause();
  }
}
function Wo_PlayVideoCall(type) {
  if (type == 'play') {
    document.getElementById('video-calling-sound').play();
    playmusic = setTimeout(function() {
       Wo_PlayVideoCall('play');
    }, 100);
  } else {
    clearTimeout(playmusic);
    document.getElementById('video-calling-sound').pause();
  }
}
function textAreaAdjust(o, h, n) {
    if (n == 'lightbox') {
      recording_node = "comm";
    } else {
       o.style.height = h + 'px';
       o.style.height = (5+o.scrollHeight)+"px";
    }
    if (n == 'comm') {
      recording_node = "comm";
    }
}

function textAreaAdjustTag(o, n) {
    if (n == 'lightbox') {
      recording_node = "comm";
    } else {
    }
    if (n == 'comm') {
      recording_node = "comm";
    }
}

function Wo_MarkAsSold(post_id, product_id) {
	var post = $('#post-' + post_id);
	post.find('.tag_post_men_disable').show();
	$.get(Wo_Ajax_Requests_File(), {
		f: 'posts',
		s: 'mark_as_sold_post',
		post_id: post_id,
		product_id: product_id
	}, function (data) {
		if(data.status == 200) {
			post.find('.product-status').text(data.text);
			$("body").snackbar({
				message: data.text
			});
			post.find('.tag_post_men_disable').hide();
			post.find('.mark-as-sold-post').html('').hide();
		}
	});
}

function Wo_VoteUp(id) {
	var $vote_con = $('#option-' + id);
	var $post_id = $vote_con.attr('data-post-id');
	if ($post_id.length == 0) {
		return false;
	}
	$is_voted = $('#post-' + $post_id).find('.options').attr('data-vote');
	if ($is_voted.length == 0) {
		return false;
	}
	if ($is_voted == 'false') {
		$('#post-' + $post_id).find('.wo_votes').addClass('active_all');
		$vote_con.addClass('active');
	}
	$('#post-' + $post_id).find('.options').attr('data-vote', true);
	$.get(Wo_Ajax_Requests_File(), {f:'vote_up', id:id}, function (data) {
		if (data.status == 200) {
			$('#post-' + $post_id).find('.result-bar-parent').removeClass('hidden');
			$('#post-' + $post_id).find('.answer-vote').removeClass('hidden');
			data.votes.forEach(function(option) {
				$('#post-' + $post_id).find('#total-votes').text(option.all);
				$('#option-' + option.id).find('.answer-vote').html(option.percentage);
				if (option.percentage_num > 0) {
					$('#option-' + option.id).find('.result-bar').text(' ').css('width', option.percentage);
				}
			});
		} else if (data.status == 400) {
			$("body").snackbar({
				message: data.text
			});
		} 
	});
}

function Wo_UploadReplyCommentImage(id) {
  var image_container = $('#post-' + id);
  var fetched_image = $('.comment-reply-image-'+id);
  var data = new FormData();
  data.append('image', $('#comment_reply_image_' + id).prop('files')[0]);
  fetched_image.html('<div class="skel skel_comm_img"></div>');
  $.ajax({
        type: "POST",
        url: Wo_Ajax_Requests_File() + '?f=upload_image&id=' + id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
			fetched_image.html('');
            fetched_image.html('<img src="' + data.image + '"><div class="remove-icon" onclick="Wo_EmptyReplyCommentImage(' + id + ')"><svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22"><path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>');
            $('#comment_src_image_' + id).val(data.image_src);
            fetched_image.removeClass('hidden');
            image_container.find('.comment-reply-textarea').focus();
          }
          //fetched_image.html('');
        }
    });
}
function Wo_EmptyReplyCommentImage(id) {
  var image_container = $('#post-' + id);
  var fetched_image = $('.comment-reply-image-'+id);
  $('.comment-image-con').empty();
  $('#comment_src_image_'+id).val('');
  $('#comment_src_image_'+id).val('');
  $('#comment_reply_image_' + id).val('');
}


function Wo_UploadCommentImage(id) {
  var image_container = $('#post-' + id);
  var fetched_image = image_container.find('#comment-image');
  var data = new FormData();
  data.append('image', $('#comment_image_' + id).prop('files')[0]);
  fetched_image.html('<div class="skel skel_comm_img"></div>');
  $.ajax({
        type: "POST",
        url: Wo_Ajax_Requests_File() + '?f=upload_image&id=' + id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
			fetched_image.html('');
            fetched_image.html('<img src="' + data.image + '"><div class="remove-icon" onclick="Wo_EmptyCommentImage(' + id + ')"><svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22"><path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>');
            image_container.find('#comment_src_image').val(data.image_src);
            fetched_image.removeClass('hidden');
            image_container.find('.comment-textarea').focus();
          }
          //fetched_image.html('');
        }
    });
}

function Wo_EmptyCommentImage(id) {
  var image_container = $('#post-' + id);
  var fetched_image = image_container.find('#comment-image');
  image_container.find('.comment-image-con').empty().addClass('hidden');
  image_container.find('#comment_src_image').val('');
  image_container.find('#comment_src_image').val('');
  image_container.find('#comment_image_' + id).val('');
}

function Wo_TurnOffSound() {
  var sound = $('.turn-off-sound');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'turn-off-sound'
  }, function (data) {
    if(data.status == 200) {
      sound.html(data.message);
    }
  });
}

function Wo_Del_Article(id) {
	$('#delete-blog').find('.disable_btn').attr('disabled','disabled');
    $.ajax({
        type: "GET",
        url: Wo_Ajax_Requests_File(),
        data: {
            id: id,
            f: 'delete-my-blog'
        },
        dataType: 'json',
        success: function(data) {
            if (data['status'] == 200) {
                $("#delete-blog").modal("hide");
                $("div[data-rm-blog='" + data['id'] + "']").fadeOut(function() {
                    $(this).remove()
                });
            }
			$('#delete-blog').find('.disable_btn').removeAttr("disabled");
        }
    });
}

function Wo_DelReply(id) {
  if (!id) {
    return false;
  }else{

      Wo_progressIconLoader($('#delete-reply').find('button'));
      $.ajax({
          type: "GET",
          url: Wo_Ajax_Requests_File(),
          data: {
              id: id,
              f: 'delete-reply'
          },
          dataType: 'json',
          success: function(data) {
              if (data['status'] == 200) {
                  $("#delete-reply").modal("hide");
                  $("[data-thread-reply='" + id + "']").slideUp(function() {
                      $(this).remove()
                  });
              }
              Wo_progressIconLoader($('#delete-reply').find('button'));
          }
      });
  }
}

function Wo_DelThread(id) {
  if (!id) {
    return false;
  }else{

      Wo_progressIconLoader($('#delete-thread').find('button'));
      $.ajax({
          type: "GET",
          url: Wo_Ajax_Requests_File(),
          data: {
              id: id,
              f: 'delete-thread'
          },
          dataType: 'json',
          success: function(data) {
              if (data['status'] == 200) {
                  $("#delete-thread").modal("hide");
                  $("[data-thread-ident='" + id + "']").slideUp(function() {
                      $(this).remove()
                  });
              }
              Wo_progressIconLoader($('#delete-thread').find('button'));
          }
      });
  }
}
var Wo_Delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
function Wo_AddVideoViews(post_id){
  $('.video-js').each(function(index, el) {
    if ($(this).attr('data-post-video') != post_id) {
      $(this).get(0).pause();
    }
  });
    if (post_id && typeof(Number(post_id)) == 'number'  && post_id > 0) {
      Wo_Delay(function(){
        $.ajax({
          url: Wo_Ajax_Requests_File(),
          type: 'GET',
          dataType: 'json',
          data: {f:'posts', s:'add-video-view',post_id:post_id},
        })
        .done(function(data) {
          if (data.status == 200) {
            $("span[data-post-video-views="+post_id+"]").text(data.views);
            $("video[data-post-video="+post_id+"]").removeAttr('onplay');
          }
        })
      },5000)
    }
  }
function Wo_DeleteStatus(id){
  if (!id || !confirm('Are you sure you want to delete your status?')) {
    return false;
  }

  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'status',s:'remove',id:id},
  })
  .done(function(data) {
    if (data.status == 200) {
      location.reload();
      $("[data-status-id='"+id+"']").slideUp(function(){
        $(this).remove();
      })
    }
  })
  .fail(function() {
    console.log("error");
  })
}

function Wo_StoryProgress(){
  $('.mfp-progress-line').html('<span width="0"></span>').find('span').delay(1).queue(function () {
    $(this).css('width', '100%')
  });   
}


function Wo_EditReplyComment(id){
  if (!id) { return false;}
  var self = $("div[data-post-comm-reply-edit='"+id+"']").toggleClass('hidden');  
  //self.find('textarea').val($("div[data-post-comm-reply-text='"+id+"']").text().trim());
}

function Wo_UpdatCommReply(id,event,self){
  if (!id || !event || !self) {
    return false;
  }

  else if (event.keyCode == 13 && event.shiftKey == 0) {
    var text = $(self).val();
    var id   = id;
    $.ajax({
      url: Wo_Ajax_Requests_File() + "?f=posts&s=update-reply",
      type: 'POST',
      dataType: 'json',
      data: {id:id,text:text},
    })
    .done(function(data) {
      if (data.status == 200) {
        $("div[data-post-comm-reply-text='"+id+"']").html(data.text);
        var edit_box = $("div[data-post-comm-reply-edit='"+id+"']").addClass('hidden');
        edit_box.find('textarea').val(data.orginal);
      }
    })
    .fail(function() {
      console.log("error");
    })
    
  }
  else{
    Wo_Get_Mention(self);
  }

}

function Wo_HidePost(post_id){
	if (!post_id) {
		return false;
	}
	$.ajax({
		url: Wo_Ajax_Requests_File(),
		type: 'GET',
		dataType: 'json',
		data: {f: 'posts',s:'hide_post',post:post_id},
	})
	.done(function(data) {
		if (data.status == 200) {
			$("#post-"+post_id).slideUp(function(){
				$(this).remove();
			})
		}
	})
	.fail(function() {
		console.log("error");
	})
}

function Wo_SharePostOn(post_id, owner_id,type){

  if (!post_id) {
    return false;
  }
    
    $('#share_post_modal').modal('hide');
    $('#share_post_modal').remove();
    $.ajax({
      url: Wo_Ajax_Requests_File(),
      type: 'GET',
      dataType: 'json',
      data: {f: 'get_share_post',post_id:post_id},
    })
    .done(function(data) {
      if (data.status == 200) {
        $('body').append(data.html);
        $('#SearchForInputPostId').val(post_id);
        $('#SearchForInputTypeId').val(owner_id);
        $('#share_post_modal').modal('show');
      }
    })
    .fail(function() {
    })
    .always(function() {
    });
    
}
function SearchFor(self,type){
  name = $(self).val();
  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'search_for',s:type,name:name},
  })
  .done(function(data) {
    if (data.status == 200) {
      $(self).autocomplete({
        source: data.info,
        select: function (event, ui) {
          //if (type == 'group') {
            $('#SearchForInputTypeId').val(ui.item.id);
          // }
          // else if (type == 'page') {
          //   $('#SearchForInputPage').val(ui.item.id);
          // }
          // else if (type == 'user') {
          //   $('#SearchForInputUser').val(ui.item.id);
          // }
        }
      });
    }
    else{

    }
  })
  .fail(function() {
  })
}

function Wo_AddGroupUserAdmin(member_id, group_id, self){
  if (!member_id || !group_id || !self) {
    return false;
  }
  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'groups',s:'add_admin',user_id:member_id,group_id:group_id},
  })
  .done(function(data) {
    if (data.status == 200 && data.code == 1) {
      $(self).find('span').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#bababa" d="M13.41406,12l3.293-3.293A.99989.99989,0,0,0,15.293,7.293L12,10.58594,8.707,7.293A.99989.99989,0,0,0,7.293,8.707L10.58594,12,7.293,15.293A.99989.99989,0,0,0,8.707,16.707L12,13.41406l3.293,3.293A.99989.99989,0,0,0,16.707,15.293Z"></path><path fill="#bababa" opacity="0.2" d="M19.0708,4.9292A9.99962,9.99962,0,1,0,4.9292,19.0708,9.99962,9.99962,0,1,0,19.0708,4.9292ZM16.707,15.293A.99989.99989,0,1,1,15.293,16.707L12,13.41406,8.707,16.707A.99989.99989,0,0,1,7.293,15.293L10.58594,12,7.293,8.707A.99989.99989,0,0,1,8.707,7.293L12,10.58594l3.293-3.293A.99989.99989,0,0,1,16.707,8.707L13.41406,12Z"></path></svg>');
      $('#privileges_admin_'+member_id).slideDown();
    }
    else if(data.status == 200 && data.code == 0){
      $(self).find('span').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#4CAF50" d="M10.3125,16.09375a.99676.99676,0,0,1-.707-.293L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328l-6.1875,6.1875A.99676.99676,0,0,1,10.3125,16.09375Z" opacity=".99"></path><path fill="#4CAF50" opacity="0.2" d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm5.207,7.61328-6.1875,6.1875a.99963.99963,0,0,1-1.41406,0L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328Z"></path></svg>');
      $('#privileges_admin_'+member_id).slideUp();
    }
  })
  .fail(function() {
    console.log("error");
  })
  
}

function Wo_OpenLighteBox(self ,event){
  if (!self || !event) {
    return false;
  }
  event.stopPropagation();
  var url = $(self).attr('data-href');
  $('#modal_light_box').modal('show').find('.image').attr('src', url);
}

function Wo_UpdateLocation(position) {
  if (!position) {
    return false; 
  }
  $.post(Wo_Ajax_Requests_File() + '?f=save_user_location', {lat: position.coords.latitude, lng:position.coords.longitude}, function(data, textStatus, xhr) {
    if (data.status == 200) {
      return true;
    }
  });
  return false;
}


var Wo_ElementLoad = function(selector, callback){
    $(selector).each(function(){
        if (this.complete || $(this).height() > 0) {
            callback.apply(this);
        }
        else {
            $(this).on('load', function(){
                callback.apply(this);
            });
        }
    });
};


function Wo_NextProductPicture(product_id, id) {
  Wo_CloseLightbox();
  $('body').addClass('no_scroll');
  $('body').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_next_product_image', product_id:product_id, after_image_id:id}, function(data) {
    if (data.status == 200) {
      $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
	if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}

function Wo_PreviousProductPicture(product_id, id) {
  Wo_CloseLightbox();
  $('body').addClass('no_scroll');
  $('body').append('<div class="lightbox-container"><div class="tag_lboxside_skel"><div class="valign tag_lbox_toolbar"><div class="valign"><div class="btn btn-mat close-lightbox" onclick="Wo_CloseLightbox();"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></svg></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_previous_product_image', product_id:product_id, before_image_id:id}, function(data) {
    if (data.status == 200) {
      $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
	if (data.html.length == 0) {
       $('body').removeClass('no_scroll');
    }
  });
}
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


function Wo_IsFileAllowedToUpload(filename, allowed) {
    var extension = filename.replace(/^.*\./, '').toLowerCase();
    var allowed_array = allowed.split(',');
    if (isInArray(extension, allowed_array)) {
      return true;
    }
    return false;
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/*Stickey Sidebar*/
!function(i){i.fn.theiaStickySidebar=function(t){function e(t,e){var a=o(t,e);a||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)),i(window).on("resize."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)))}function o(t,e){return t.initialized===!0||!(i("body").width()<t.minWidth)&&(a(t,e),!0)}function a(t,e){t.initialized=!0;var o=i("#theia-sticky-sidebar-stylesheet-"+t.namespace);0===o.length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),e.each(function(){function e(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:"",transform:"none"})}function o(t){var e=t.height();return t.children().each(function(){e=Math.max(e,i(this).height())}),e}var a={};if(a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.length&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:a.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length){var s=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;a.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(s)}).remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)}a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var r=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),r-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-r,0==r?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,e(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void e();if(a.options.disableOnResponsiveLayouts){var s=a.sidebar.outerWidth("none"==a.sidebar.css("float"));if(s+50>a.container.width())return void e()}var r=i(document).scrollTop(),d="static";if(r>=a.sidebar.offset().top+(a.paddingTop-a.options.additionalMarginTop)){var c,p=a.paddingTop+t.additionalMarginTop,b=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,l=a.sidebar.offset().top,f=a.sidebar.offset().top+o(a.container),h=0+t.additionalMarginTop,g=a.stickySidebar.outerHeight()+p+b<i(window).height();c=g?h+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var u=l-r+a.paddingTop,S=f-r-a.paddingBottom-a.marginBottom,y=a.stickySidebar.offset().top-r,m=a.previousScrollTop-r;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(y+=m),"stick-to-top"==a.options.sidebarBehavior&&(y=t.additionalMarginTop),"stick-to-bottom"==a.options.sidebarBehavior&&(y=c-a.stickySidebar.outerHeight()),y=m>0?Math.min(y,h):Math.max(y,c-a.stickySidebar.outerHeight()),y=Math.max(y,u),y=Math.min(y,S-a.stickySidebar.outerHeight());var k=a.container.height()==a.stickySidebar.outerHeight();d=(k||y!=h)&&(k||y!=c-a.stickySidebar.outerHeight())?r+y-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==d){var v=i(document).scrollLeft();a.stickySidebar.css({position:"fixed",width:n(a.stickySidebar)+"px",transform:"translateY("+y+"px)",left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))-v+"px",top:"0px"})}else if("absolute"==d){var x={};"absolute"!=a.stickySidebar.css("position")&&(x.position="absolute",x.transform="translateY("+(r+y-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom)+"px)",x.top="0px"),x.width=n(a.stickySidebar)+"px",x.left="",a.stickySidebar.css(x)}else"static"==d&&e();"static"!=d&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=r}},a.onScroll(a),i(document).on("scroll."+a.options.namespace,function(i){return function(){i.onScroll(i)}}(a)),i(window).on("resize."+a.options.namespace,function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(a.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(a))})}function n(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return"undefined"==typeof t&&(t=i.width()),t}var s={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"};return t=i.extend(s,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,e(t,this),this}}(jQuery);



/*!
 * Snackbar
 */
$.fn.snackbar=function(a){var t=this,i=$('<div class="snackbar"></div>');$(".snackbar").remove();var s,e,o=7,n="This is a snackbar. (snackbar.js)",c=!1,r="UNDO",d=!1;if(void 0!=a&&(void 0!=a.primary&&(s=a.primary),void 0!=a.accent&&(e=a.accent),void 0!=a.duration&&(o=a.duration),void 0!=a.message&&(n=a.message),void 0!=a.optionText&&(r=a.optionText,r.length>0&&(c=!0)),void 0!=a.swipe&&(d=a.swipe),void 0==a.callback&&(a.callback=function(){}),i.callback=a.callback),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(i.css({width:"100%",left:"0",bottom:"0"}),d=!1),$message=$('<span class="snackbar-message"></span>'),$message.text(n),void 0!=s&&$message.css("color",s),i.append($message),c&&($option=$('<span class="snackbar-option"></span>'),$option.text(r),void 0!=e&&$option.css("color",e),i.append($option)),t.append(i),$(i).show("drop",{direction:"down"},300),d){var l=$(i).offset().left;i.draggable({axis:"x",start:function(a,t){startX=a.clientX},drag:function(a,t){startX-a.clientX>100&&i.css("opacity",1-(startX-a.clientX-100)/200),a.clientX-startX>100&&i.css("opacity",1-(a.clientX-startX-100)/200)},stop:function(a,t){startX-a.clientX>100&&i.hide("drop",{direction:"left"},300),a.clientX-startX>100&&i.hide("drop",{direction:"right"},300),startX-a.clientX<100&&($(this).animate({left:l},250),i.css("opacity",1))}})}else i.delay(1e3*o).hide("drop",{direction:"down"},300);c&&$option.click(function(){i.callback()})};


/*!
  Non-Sucking Autogrow 1.1.6
  license: MIT
  author: Roman Pushkin
  https://github.com/ro31337/jquery.ns-autogrow
*/
(function(){var e;!function(t,l){return t.fn.autogrow=function(i){if(null==i&&(i={}),null==i.horizontal&&(i.horizontal=!0),null==i.vertical&&(i.vertical=!0),null==i.debugx&&(i.debugx=-1e4),null==i.debugy&&(i.debugy=-1e4),null==i.debugcolor&&(i.debugcolor="yellow"),null==i.flickering&&(i.flickering=!0),null==i.postGrowCallback&&(i.postGrowCallback=function(){}),null==i.verticalScrollbarWidth&&(i.verticalScrollbarWidth=e()),i.horizontal!==!1||i.vertical!==!1)return this.filter("textarea").each(function(){var e,n,r,o,a,c,d;if(e=t(this),!e.data("autogrow-enabled"))return e.data("autogrow-enabled"),a=e.height(),c=e.width(),o=1*e.css("lineHeight")||0,e.hasVerticalScrollBar=function(){return e[0].clientHeight<e[0].scrollHeight},n=t('<div class="autogrow-shadow"></div>').css({position:"absolute",display:"inline-block","background-color":i.debugcolor,top:i.debugy,left:i.debugx,"max-width":e.css("max-width"),padding:e.css("padding"),fontSize:e.css("fontSize"),fontFamily:e.css("fontFamily"),fontWeight:e.css("fontWeight"),lineHeight:e.css("lineHeight"),resize:"none","word-wrap":"break-word"}).appendTo(document.body),i.horizontal===!1?n.css({width:e.width()}):(r=e.css("font-size"),n.css("padding-right","+="+r),n.normalPaddingRight=n.css("padding-right")),d=function(t){return function(l){var r,d,s;return d=t.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n /g,"<br/>&nbsp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>").replace(/ {2,}/g,function(e){return Array(e.length-1).join("&nbsp;")+" "}),/(\n|\r)/.test(t.value)&&(d+="<br />",i.flickering===!1&&(d+="<br />")),n.html(d),i.vertical===!0&&(r=Math.max(n.height()+o,a),e.height(r)),i.horizontal===!0&&(n.css("padding-right",n.normalPaddingRight),i.vertical===!1&&e.hasVerticalScrollBar()&&n.css("padding-right","+="+i.verticalScrollbarWidth+"px"),s=Math.max(n.outerWidth(),c),e.width(s)),i.postGrowCallback(e)}}(this),e.change(d).keyup(d).keydown(d),t(l).resize(d),d()})}}(window.jQuery,window),e=function(){var e,t,l,i;return e=document.createElement("p"),e.style.width="100%",e.style.height="200px",t=document.createElement("div"),t.style.position="absolute",t.style.top="0px",t.style.left="0px",t.style.visibility="hidden",t.style.width="200px",t.style.height="150px",t.style.overflow="hidden",t.appendChild(e),document.body.appendChild(t),l=e.offsetWidth,t.style.overflow="scroll",i=e.offsetWidth,l===i&&(i=t.clientWidth),document.body.removeChild(t),l-i}}).call(this);


function escapeHtml(html)
{
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
}

function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

function Wo_RegisterCommentReaction(comment_id,reaction){
  if (!comment_id && !reaction)
    return false;

  $('.reactions-comment-container-' + comment_id).css('display', 'none');
  $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'register_comment_reaction', comment_id: comment_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
		if (node_socket_flow == "1") {
			socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "added" });
		}
        $('.comment-reactions-icons-'+comment_id).html(data.reactions);
        $('.comment-status-reaction-'+comment_id).addClass("active-like");
        //$('.c_likes-'+comment_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}

function Wo_RegisterBlogCommentReaction(comment_id,reaction){
  if (!comment_id && !reaction)
    return false;

  $('.reactions-comment-container-' + comment_id).css('display', 'none');
  $.get(Wo_Ajax_Requests_File(), {f: 'blog', s: 'register_blog_comment_reaction', comment_id: comment_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
		if (node_socket_flow == "1") {
            socket.emit("user_notification", { to_id: data.user_id, user_id: _getCookie("user_id"), type: "added" });
        }
        $('.comment-reactions-icons-'+comment_id).html(data.reactions);
        $('.comment-status-reaction-'+comment_id).addClass("active-like");
        //$('.c_likes-'+comment_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}


function Wo_RegisterBlogReplyReaction(user_id,reply_id,reaction){
  if (!reply_id && !reaction)
    return false;

  $('.reactions-box-comment-replay-container-' + reply_id).css('display', 'none');
  $.get(Wo_Ajax_Requests_File(), {f: 'blog', s: 'register_reply_reaction', user_id: user_id, reply_id: reply_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
		if (node_socket_flow == "1") {
            socket.emit("user_notification", { to_id: data.user_id, user_id: _getCookie("user_id"), type: "added" });
        }
        $('.replay-reactions-icons-'+reply_id).html(data.reactions);
        $('.replay-status-reaction-'+reply_id).addClass("active-like");
        //$('.r_likes-'+reply_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}

function Wo_RegisterlightboxCommentReaction(comment_id,reaction){
  if (!comment_id && !reaction)
    return false;

  $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'register_comment_reaction', comment_id: comment_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
		if (node_socket_flow == "1") {
          socket.emit("comment_notification", { comment_id: comment_id, user_id: _getCookie("user_id"), type: "added" });
        }
        $('.lightbox-comment-reactions-icons-'+comment_id).html(data.reactions);
        $('.lightbox-comment-status-reaction-'+comment_id).addClass("active-like");
        //$('.c_likes-'+comment_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}


function Wo_RegisterReplyReaction(user_id,reply_id,reaction){
  if (!reply_id && !reaction)
    return false;

  $('.reactions-box-comment-replay-container-' + reply_id).css('display', 'none');
  $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'register_replay_reaction', user_id: user_id, reply_id: reply_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
		if (node_socket_flow == "1") {
			socket.emit("reply_notification", { reply_id: reply_id, user_id: _getCookie("user_id"), type: "added" });
		}
        $('.replay-reactions-icons-'+reply_id).html(data.reactions);
        $('.replay-status-reaction-'+reply_id).addClass("active-like");
        //$('.r_likes-'+reply_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}


function load_ajax_emojii(id, path){
    var emojjii = "😀*😁*😂*🤣*😃*😄*😅*😆*😉*😊*😋*😎*😍*😘*😗*😙*😚*🙂*🤗*🤩*🤔*🤨*😐*😑*😶*🙄*😏*😣*😥*😮*🤐*😯*😪*😫*😴*😌*😛*😜*😝*🤤*😒*😓*😔*😕*🙃*🤑*😲*☹️*🙁*😖*😞*😟*😤*😢*😭*😦*😧*😨*😩*🤯*😬*😰*😱*😳*🤪*😵*😡*😠*🤬*😷*🤒*🤕*🤢*🤮*🤧*😇*🤠*🤡*🤥*🤫*🤭*🧐*🤓*😈*👿*👹*👺*💀*👻*👽*🤖*💩*😺*😸*😹*😻*😼*😽*🙀*😿*😾*👶*👧*🧒*👦*👩*🧑*👨*👵*🧓*👴*👲*💅*🤳*💃*🕺*🕴*👫*👭*👬*💑*🤲*👐*🙌*👏*🤝*👍*👎*👊*✊*🤛*🤜*🤞*✌️*🤟*🤘*👌*👈*👉*👆*👇*☝️*✋*🤚*🖐*🖖*👋*🤙*💪*🖕*✍️*🙏*💍*💄*💋*👄*👅*👂*👃*👣*👁*👀*🧠*🗣*👤*👥";
    
	$('.emo-comment-container-' + id ).html("");
	$.each(emojjii.split('*'), function(key, value) {
		$('.emo-comment-container-' + id ).append("<span class=\"emoji_holder\" onclick=\"Wo_AddEmoToCommentInput("+ id +",'"+ value +"');\"><span>"+ value + "</span>");
	});
}
function load_ajax_reply_emojii(id, path){
    var emojjii = "😀*😁*😂*🤣*😃*😄*😅*😆*😉*😊*😋*😎*😍*😘*😗*😙*😚*🙂*🤗*🤩*🤔*🤨*😐*😑*😶*🙄*😏*😣*😥*😮*🤐*😯*😪*😫*😴*😌*😛*😜*😝*🤤*😒*😓*😔*😕*🙃*🤑*😲*☹️*🙁*😖*😞*😟*😤*😢*😭*😦*😧*😨*😩*🤯*😬*😰*😱*😳*🤪*😵*😡*😠*🤬*😷*🤒*🤕*🤢*🤮*🤧*😇*🤠*🤡*🤥*🤫*🤭*🧐*🤓*😈*👿*👹*👺*💀*👻*👽*🤖*💩*😺*😸*😹*😻*😼*😽*🙀*😿*😾*👶*👧*🧒*👦*👩*🧑*👨*👵*🧓*👴*👲*💅*🤳*💃*🕺*🕴*👫*👭*👬*💑*🤲*👐*🙌*👏*🤝*👍*👎*👊*✊*🤛*🤜*🤞*✌️*🤟*🤘*👌*👈*👉*👆*👇*☝️*✋*🤚*🖐*🖖*👋*🤙*💪*🖕*✍️*🙏*💍*💄*💋*👄*👅*👂*👃*👣*👁*👀*🧠*🗣*👤*👥";
    
  $('.emo-comment-container-' + id ).html("");
  $.each(emojjii.split('*'), function(key, value) {
    $('.emo-comment-container-' + id ).append("<span class=\"emoji_holder\" onclick=\"Wo_AddEmoTo_replyCommentInput("+ id +",'"+ value +"');\"><span>"+ value + "</span>");
  });
}
function Wo_AddEmoTo_replyCommentInput(post_id, code, type) {
    inputTag = $('[id=post-' + post_id + ']').find('.comment-reply-textarea');
    if (type == 'lightbox-post-footer') {
       inputTag = $('.lightbox-post-footer').find('.comment-reply-textarea');
    }
    inputVal = inputTag.val();
    if (typeof(inputTag.attr('placeholder')) != "undefined") {
        inputPlaceholder = inputTag.attr('placeholder');
        if (inputPlaceholder == inputVal) {
            inputTag.val('');
            inputVal = inputTag.val();
        }
    }
    if (inputVal.length == 0) {
        inputTag.val(code + ' ');
    } else {
        inputTag.val(inputVal + ' ' + code);
    }
    inputTag.keyup().focus();
}

function _getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
  
var _shortcut_helper = _getCookie("shortcut_helper");
if ( _shortcut_helper == "false" ) {
  $('#shortcut_helper').hide();
}
  
$(window).on('load', function() {
  window.post = 0;
  $('body').on('keypress', function(key) {
    var tag = key.target.tagName.toLowerCase();

    key.stopPropagation();
    var k = parseInt(key.which, 10);
    if( window.post >= 0 ){
      if( k == 106 && tag != 'input' && tag != 'textarea'){
  
        var date = new Date();
        var expires = "";
            date.setTime(date.getTime() + (7*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
            document.cookie = "shortcut_helper=false" + expires + "; path=/";

        $('#shortcut_helper').show();
        
        console.log(post);
        if( $( '.post-container' ).eq( window.post ).hasClass( 'user-ad-container' ) ){
          console.log('ad');
          $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        }

        var listItems = $( '.post-container .post' ).eq( window.post ).find('.panel');
            if (listItems.length) {
              listItems.addClass('active_shadow');
              $('html, body').animate({
                  scrollTop: parseInt(listItems.offset().top - 60)
              }, 600);
              setTimeout(function(){
                listItems.removeClass('active_shadow');
              }, 500);
            //}else{
            //  post++;
            }
            window.post++;
      }else if( k == 107 && tag != 'input' && tag != 'textarea'){
        $('#shortcut_helper').show();
        window.post--;
        var listItems = $( '.post-container .post' ).eq( post ).find('.panel');
        if (listItems.length) {
            listItems.addClass('active_shadow');
            $('html, body').animate({
                scrollTop: parseInt(listItems.offset().top - 60)
            }, 500);
            setTimeout(function(){
              listItems.removeClass('active_shadow');
            }, 500);
        }
      }
      
    }else{
      //post = post -1;
    }
  });
  
});





function Wo_ShowCommentCombo(post_id){
	comment_combo_wrapper = $('.wo_comment_combo_' + post_id);
	comment_combo_wrapper.addClass('comment-toggle');
	//comment_combo_wrapper.find('textarea').focus();
}

function Wo_Get_Mention(self) {
  $(self).triggeredAutocomplete({
       source: Wo_Ajax_Requests_File() + "?f=mention",
       trigger: "@" 
    });
}

function Wo_RemoveBlur(self,id) {
  $('.remover_blur_btn_'+id).remove();
  $('.remover_blur_'+id).removeClass('image_blur');
}
function Wo_RemoveBlurAlbum(self,id) {
  $('.show_album_'+id).remove();
}

function Wo_OpenJobEditBox(job_id) {
  var edit_box = $('#edit-job-modal-' + job_id);
  edit_box.modal({
    show: true
  });
}

function Wo_ShowCommonUserProfile(user_id) {
  $('#contnet').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="valign tag_comm_skel"><div class="tag_comm_skels"><div class="tag_comm_skels_innr"><div class="tag_comm_skels_covr"></div><div class="tag_comm_skels_avtr"></div><div class="tag_comm_skels_name"></div></div></div><div class="tag_comm_skels"><div class="tag_comm_skels_innr"><div class="tag_comm_skels_covr"></div><div class="tag_comm_skels_avtr"></div><div class="tag_comm_skels_name"></div></div></div><div class="tag_comm_skels"><div class="tag_comm_skels_innr"><div class="tag_comm_skels_covr"></div><div class="tag_comm_skels_avtr"></div><div class="tag_comm_skels_name"></div></div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'show_common_user',s:'show', user_id:user_id}, function(data) {
    if (data.status == 200) {
      $('body').addClass('no_scroll');
      $('.lightbox-container').html(data.html);
    }
    if (data.html.length == 0) {
	   $('body').removeClass('no_scroll');
    }
  });
}

function Wo_DeleteFund(id) {
    $("#delete-fund").find('.disable_btn').attr('disabled','disabled');
    $.ajax({
        type: "GET",
        url: Wo_Ajax_Requests_File(),
        data: {
            id: id,
            f: 'funding',
            s: 'delete_fund'
        },
        dataType: 'json',
        success: function(data) {
            if (data['status'] == 200) {
                $("#delete-fund").modal("hide");
                $("div[data-rm-blog='" + id + "']").fadeOut(function() {
                    $(this).remove()
                });
            }
            $("#delete-fund").find('.disable_btn').removeAttr("disabled");
        }
    });
}

function go_to_duration(id,duration) {
	if ($('#video--'+id+'_html5_api').length > 0) {
		id = 'video--'+id+'_html5_api';
	}
	else{
		id = 'video--'+id;
	}
	var vid = document.getElementById(id);
	vid.currentTime = duration;
	vid.play();
}

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports&&"function"==typeof require?e(require("jquery")):e(jQuery)}(function(e){"use strict";var t={escapeRegExChars:function(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")},createNode:function(e){var t=document.createElement("div");return t.className=e,t.style.position="absolute",t.style.display="none",t}},n=27,o=9,s=13,i=38,a=39,u=40,r=e.noop;function l(t,n){var o=this;o.element=t,o.el=e(t),o.suggestions=[],o.badQueries=[],o.selectedIndex=-1,o.currentValue=o.element.value,o.timeoutId=null,o.cachedResponse={},o.onChangeTimeout=null,o.onChange=null,o.isLocal=!1,o.suggestionsContainer=null,o.noSuggestionsContainer=null,o.options=e.extend({},l.defaults,n),o.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},o.hint=null,o.hintValue="",o.selection=null,o.initialize(),o.setOptions(n)}l.utils=t,e.Autocomplete=l,l.defaults={ajaxSettings:{},autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:function(e,n){if(!n)return e.value;var o="("+t.escapeRegExChars(n)+")";return e.value.replace(new RegExp(o,"gi"),"<strong>$1</strong>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/&lt;(\/?strong)&gt;/g,"<$1>")},formatGroup:function(e,t){return'<div class="autocomplete-group">'+t+"</div>"},delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:r,onSearchComplete:r,onSearchError:r,preserveInput:!1,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:function(e,t,n){return-1!==e.value.toLowerCase().indexOf(n)},paramName:"query",transformResult:function(t){return"string"==typeof t?e.parseJSON(t):t},showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1},l.prototype={initialize:function(){var t,n=this,o="."+n.classes.suggestion,s=n.classes.selected,i=n.options;n.element.setAttribute("autocomplete","off"),n.noSuggestionsContainer=e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),n.suggestionsContainer=l.utils.createNode(i.containerClass),(t=e(n.suggestionsContainer)).appendTo(i.appendTo||"body"),"auto"!==i.width&&t.css("width",i.width),t.on("mouseover.autocomplete",o,function(){n.activate(e(this).data("index"))}),t.on("mouseout.autocomplete",function(){n.selectedIndex=-1,t.children("."+s).removeClass(s)}),t.on("click.autocomplete",o,function(){n.select(e(this).data("index"))}),t.on("click.autocomplete",function(){clearTimeout(n.blurTimeoutId)}),n.fixPositionCapture=function(){n.visible&&n.fixPosition()},e(window).on("resize.autocomplete",n.fixPositionCapture),n.el.on("keydown.autocomplete",function(e){n.onKeyPress(e)}),n.el.on("keyup.autocomplete",function(e){n.onKeyUp(e)}),n.el.on("blur.autocomplete",function(){n.onBlur()}),n.el.on("focus.autocomplete",function(){n.onFocus()}),n.el.on("change.autocomplete",function(e){n.onKeyUp(e)}),n.el.on("input.autocomplete",function(e){n.onKeyUp(e)})},onFocus:function(){var e=this;e.fixPosition(),e.el.val().length>=e.options.minChars&&e.onValueChange()},onBlur:function(){var e=this;e.blurTimeoutId=setTimeout(function(){e.hide()},200)},abortAjax:function(){var e=this;e.currentRequest&&(e.currentRequest.abort(),e.currentRequest=null)},setOptions:function(t){var n=this,o=n.options;this.options=e.extend({},o,t),n.isLocal=e.isArray(o.lookup),n.isLocal&&(o.lookup=n.verifySuggestionsFormat(o.lookup)),o.orientation=n.validateOrientation(o.orientation,"bottom"),e(n.suggestionsContainer).css({"max-height":o.maxHeight+"px",width:o.width+"px","z-index":o.zIndex})},clearCache:function(){this.cachedResponse={},this.badQueries=[]},clear:function(){this.clearCache(),this.currentValue="",this.suggestions=[]},disable:function(){var e=this;e.disabled=!0,clearTimeout(e.onChangeTimeout),e.abortAjax()},enable:function(){this.disabled=!1},fixPosition:function(){var t=this,n=e(t.suggestionsContainer),o=n.parent().get(0);if(o===document.body||t.options.forceFixPosition){var s=t.options.orientation,i=n.outerHeight(),a=t.el.outerHeight(),u=t.el.offset(),r={top:u.top,left:u.left};if("auto"===s){var l=e(window).height(),c=e(window).scrollTop(),g=-c+u.top-i,d=c+l-(u.top+a+i);s=Math.max(g,d)===g?"top":"bottom"}if(r.top+="top"===s?-i:a,o!==document.body){var h,p=n.css("opacity");t.visible||n.css("opacity",0).show(),h=n.offsetParent().offset(),r.top-=h.top,r.left-=h.left,t.visible||n.css("opacity",p).hide()}"auto"===t.options.width&&(r.width=t.el.outerWidth()+"px"),n.css(r)}},isCursorAtEnd:function(){var e,t=this.el.val().length,n=this.element.selectionStart;return"number"==typeof n?n===t:!document.selection||((e=document.selection.createRange()).moveStart("character",-t),t===e.text.length)},onKeyPress:function(e){var t=this;if(t.disabled||t.visible||e.which!==u||!t.currentValue){if(!t.disabled&&t.visible){switch(e.which){case n:t.el.val(t.currentValue),t.hide();break;case a:if(t.hint&&t.options.onHint&&t.isCursorAtEnd()){t.selectHint();break}return;case o:if(t.hint&&t.options.onHint)return void t.selectHint();if(-1===t.selectedIndex)return void t.hide();if(t.select(t.selectedIndex),!1===t.options.tabDisabled)return;break;case s:if(-1===t.selectedIndex)return void t.hide();t.select(t.selectedIndex);break;case i:t.moveUp();break;case u:t.moveDown();break;default:return}e.stopImmediatePropagation(),e.preventDefault()}}else t.suggest()},onKeyUp:function(e){var t=this;if(!t.disabled){switch(e.which){case i:case u:return}clearTimeout(t.onChangeTimeout),t.currentValue!==t.el.val()&&(t.findBestHint(),t.options.deferRequestBy>0?t.onChangeTimeout=setTimeout(function(){t.onValueChange()},t.options.deferRequestBy):t.onValueChange())}},onValueChange:function(){var t=this,n=t.options,o=t.el.val(),s=t.getQuery(o);t.selection&&t.currentValue!==s&&(t.selection=null,(n.onInvalidateSelection||e.noop).call(t.element)),clearTimeout(t.onChangeTimeout),t.currentValue=o,t.selectedIndex=-1,n.triggerSelectOnValidInput&&t.isExactMatch(s)?t.select(0):s.length<n.minChars?t.hide():t.getSuggestions(s)},isExactMatch:function(e){var t=this.suggestions;return 1===t.length&&t[0].value.toLowerCase()===e.toLowerCase()},getQuery:function(t){var n,o=this.options.delimiter;return o?(n=t.split(o),e.trim(n[n.length-1])):t},getSuggestionsLocal:function(t){var n,o=this.options,s=t.toLowerCase(),i=o.lookupFilter,a=parseInt(o.lookupLimit,10);return n={suggestions:e.grep(o.lookup,function(e){return i(e,t,s)})},a&&n.suggestions.length>a&&(n.suggestions=n.suggestions.slice(0,a)),n},getSuggestions:function(t){var n,o,s,i,a=this,u=a.options,r=u.serviceUrl;u.params[u.paramName]=t,!1!==u.onSearchStart.call(a.element,u.params)&&(o=u.ignoreParams?null:u.params,e.isFunction(u.lookup)?u.lookup(t,function(e){a.suggestions=e.suggestions,a.suggest(),u.onSearchComplete.call(a.element,t,e.suggestions)}):(a.isLocal?n=a.getSuggestionsLocal(t):(e.isFunction(r)&&(r=r.call(a.element,t)),s=r+"?"+e.param(o||{}),n=a.cachedResponse[s]),n&&e.isArray(n.suggestions)?(a.suggestions=n.suggestions,a.suggest(),u.onSearchComplete.call(a.element,t,n.suggestions)):a.isBadQuery(t)?u.onSearchComplete.call(a.element,t,[]):(a.abortAjax(),i={url:r,data:o,type:u.type,dataType:u.dataType},e.extend(i,u.ajaxSettings),a.currentRequest=e.ajax(i).done(function(e){var n;a.currentRequest=null,n=u.transformResult(e,t),a.processResponse(n,t,s),u.onSearchComplete.call(a.element,t,n.suggestions)}).fail(function(e,n,o){u.onSearchError.call(a.element,t,e,n,o)}))))},isBadQuery:function(e){if(!this.options.preventBadQueries)return!1;for(var t=this.badQueries,n=t.length;n--;)if(0===e.indexOf(t[n]))return!0;return!1},hide:function(){var t=this,n=e(t.suggestionsContainer);e.isFunction(t.options.onHide)&&t.visible&&t.options.onHide.call(t.element,n),t.visible=!1,t.selectedIndex=-1,clearTimeout(t.onChangeTimeout),e(t.suggestionsContainer).hide(),t.signalHint(null)},suggest:function(){if(this.suggestions.length){var t,n=this,o=n.options,s=o.groupBy,i=o.formatResult,a=n.getQuery(n.currentValue),u=n.classes.suggestion,r=n.classes.selected,l=e(n.suggestionsContainer),c=e(n.noSuggestionsContainer),g=o.beforeRender,d="";o.triggerSelectOnValidInput&&n.isExactMatch(a)?n.select(0):(e.each(n.suggestions,function(e,n){var r,l;s&&(d+=(l=(r=n).data[s],t===l?"":(t=l,o.formatGroup(r,t)))),d+='<div class="'+u+'" data-index="'+e+'">'+i(n,a,e)+"</div>"}),this.adjustContainerWidth(),c.detach(),l.html(d),e.isFunction(g)&&g.call(n.element,l,n.suggestions),n.fixPosition(),l.show(),o.autoSelectFirst&&(n.selectedIndex=0,l.scrollTop(0),l.children("."+u).first().addClass(r)),n.visible=!0,n.findBestHint())}else this.options.showNoSuggestionNotice?this.noSuggestions():this.hide()},noSuggestions:function(){var t=this,n=t.options.beforeRender,o=e(t.suggestionsContainer),s=e(t.noSuggestionsContainer);this.adjustContainerWidth(),s.detach(),o.empty(),o.append(s),e.isFunction(n)&&n.call(t.element,o,t.suggestions),t.fixPosition(),o.show(),t.visible=!0},adjustContainerWidth:function(){var t,n=this.options,o=e(this.suggestionsContainer);"auto"===n.width?(t=this.el.outerWidth(),o.css("width",t>0?t:300)):"flex"===n.width&&o.css("width","")},findBestHint:function(){var t=this.el.val().toLowerCase(),n=null;t&&(e.each(this.suggestions,function(e,o){var s=0===o.value.toLowerCase().indexOf(t);return s&&(n=o),!s}),this.signalHint(n))},signalHint:function(t){var n="",o=this;t&&(n=o.currentValue+t.value.substr(o.currentValue.length)),o.hintValue!==n&&(o.hintValue=n,o.hint=t,(this.options.onHint||e.noop)(n))},verifySuggestionsFormat:function(t){return t.length&&"string"==typeof t[0]?e.map(t,function(e){return{value:e,data:null}}):t},validateOrientation:function(t,n){return t=e.trim(t||"").toLowerCase(),-1===e.inArray(t,["auto","bottom","top"])&&(t=n),t},processResponse:function(e,t,n){var o=this,s=o.options;e.suggestions=o.verifySuggestionsFormat(e.suggestions),s.noCache||(o.cachedResponse[n]=e,s.preventBadQueries&&!e.suggestions.length&&o.badQueries.push(t)),t===o.getQuery(o.currentValue)&&(o.suggestions=e.suggestions,o.suggest())},activate:function(t){var n,o=this,s=o.classes.selected,i=e(o.suggestionsContainer),a=i.find("."+o.classes.suggestion);return i.find("."+s).removeClass(s),o.selectedIndex=t,-1!==o.selectedIndex&&a.length>o.selectedIndex?(n=a.get(o.selectedIndex),e(n).addClass(s),n):null},selectHint:function(){var t=e.inArray(this.hint,this.suggestions);this.select(t)},select:function(e){this.hide(),this.onSelect(e)},moveUp:function(){var t=this;if(-1!==t.selectedIndex)return 0===t.selectedIndex?(e(t.suggestionsContainer).children().first().removeClass(t.classes.selected),t.selectedIndex=-1,t.el.val(t.currentValue),void t.findBestHint()):void t.adjustScroll(t.selectedIndex-1)},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(t){var n=this,o=n.activate(t);if(o){var s,i,a,u=e(o).outerHeight();s=o.offsetTop,a=(i=e(n.suggestionsContainer).scrollTop())+n.options.maxHeight-u,s<i?e(n.suggestionsContainer).scrollTop(s):s>a&&e(n.suggestionsContainer).scrollTop(s-n.options.maxHeight+u),n.options.preserveInput||n.el.val(n.getValue(n.suggestions[t].value)),n.signalHint(null)}},onSelect:function(t){var n=this,o=n.options.onSelect,s=n.suggestions[t];n.currentValue=n.getValue(s.value),n.currentValue===n.el.val()||n.options.preserveInput||n.el.val(n.currentValue),n.signalHint(null),n.suggestions=[],n.selection=s,e.isFunction(o)&&o.call(n.element,s)},getValue:function(e){var t,n,o=this.options.delimiter;return o?1===(n=(t=this.currentValue).split(o)).length?e:t.substr(0,t.length-n[n.length-1].length)+e:e},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete"),e(window).off("resize.autocomplete",this.fixPositionCapture),e(this.suggestionsContainer).remove()}},e.fn.devbridgeAutocomplete=function(t,n){var o="autocomplete";return arguments.length?this.each(function(){var s=e(this),i=s.data(o);"string"==typeof t?i&&"function"==typeof i[t]&&i[t](n):(i&&i.dispose&&i.dispose(),i=new l(this,t),s.data(o,i))}):this.first().data(o)},e.fn.autocomplete||(e.fn.autocomplete=e.fn.devbridgeAutocomplete)});
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(window.jQuery||window.Zepto)}(function(e){var t,n,i,o,r,a,s="Close",l="BeforeClose",c="MarkupParse",d="Open",p="Change",u="mfp",f="."+u,m="mfp-ready",g="mfp-removing",h="mfp-prevent-close",v=function(){},y=!!window.jQuery,C=e(window),w=function(e,n){t.ev.on(u+e+f,n)},b=function(t,n,i,o){var r=document.createElement("div");return r.className="mfp-"+t,i&&(r.innerHTML=i),o?n&&n.appendChild(r):(r=e(r),n&&r.appendTo(n)),r},I=function(n,i){t.ev.triggerHandler(u+n,i),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(i)?i:[i]))},x=function(n){return n===a&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),a=n),t.currTemplate.closeBtn},k=function(){e.magnificPopup.instance||((t=new v).init(),e.magnificPopup.instance=t)};v.prototype={constructor:v,init:function(){var n=navigator.appVersion;t.isLowIE=t.isIE8=document.all&&!document.addEventListener,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1}(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),i=e(document),t.popupsCache={}},open:function(n){var o;if(!1===n.isObj){t.items=n.items.toArray(),t.index=0;var a,s=n.items;for(o=0;o<s.length;o++)if((a=s[o]).parsed&&(a=a.el[0]),a===n.el[0]){t.index=o;break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0;if(!t.isOpen){t.types=[],r="",n.mainEl&&n.mainEl.length?t.ev=n.mainEl.eq(0):t.ev=i,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=b("bg").on("click"+f,function(){t.close()}),t.wrap=b("wrap").attr("tabindex",-1).on("click"+f,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=b("container",t.wrap)),t.contentContainer=b("content"),t.st.preloader&&(t.preloader=b("preloader",t.container,t.st.tLoading));var l=e.magnificPopup.modules;for(o=0;o<l.length;o++){var p=l[o];p=p.charAt(0).toUpperCase()+p.slice(1),t["init"+p].call(t)}I("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(w(c,function(e,t,n,i){n.close_replaceWith=x(i.type)}),r+=" mfp-close-btn-in"):t.wrap.append(x())),t.st.alignTop&&(r+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:C.scrollTop(),position:"absolute"}),(!1===t.st.fixedBgPos||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:i.height(),position:"absolute"}),t.st.enableEscapeKey&&i.on("keyup"+f,function(e){27===e.keyCode&&t.close()}),C.on("resize"+f,function(){t.updateSize()}),t.st.closeOnContentClick||(r+=" mfp-auto-cursor"),r&&t.wrap.addClass(r);var u=t.wH=C.height(),g={};if(t.fixedContentPos&&t._hasScrollBar(u)){var h=t._getScrollbarSize();h&&(g.marginRight=h)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):g.overflow="hidden");var v=t.st.mainClass;return t.isIE7&&(v+=" mfp-ie7"),v&&t._addClassToMFP(v),t.updateItemHTML(),I("BuildControls"),e("html").css(g),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||e(document.body)),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(m),t._setFocus()):t.bgOverlay.addClass(m),i.on("focusin"+f,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),I(d),n}t.updateItemHTML()},close:function(){t.isOpen&&(I(l),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(g),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){I(s);var n=g+" "+m+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var o={marginRight:""};t.isIE7?e("body, html").css("overflow",""):o.overflow="",e("html").css(o)}i.off("keyup.mfp focusin"+f),t.ev.off(f),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&!0!==t.currTemplate[t.currItem.type]||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t.st.autoFocusLast&&t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,I("AfterClose")},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,i=window.innerHeight*n;t.wrap.css("height",i),t.wH=i}else t.wH=e||C.height();t.fixedContentPos||t.wrap.css("height",t.wH),I("Resize")},updateItemHTML:function(){var n=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index));var i=n.type;if(I("BeforeChange",[t.currItem?t.currItem.type:"",i]),t.currItem=n,!t.currTemplate[i]){var r=!!t.st[i]&&t.st[i].markup;I("FirstMarkupParse",r),t.currTemplate[i]=!r||e(r)}o&&o!==n.type&&t.container.removeClass("mfp-"+o+"-holder");var a=t["get"+i.charAt(0).toUpperCase()+i.slice(1)](n,t.currTemplate[i]);t.appendContent(a,i),n.preloaded=!0,I(p,n),o=n.type,t.container.prepend(t.contentContainer),I("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&!0===t.currTemplate[n]?t.content.find(".mfp-close").length||t.content.append(x()):t.content=e:t.content="",I("BeforeAppend"),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var i,o=t.items[n];if(o.tagName?o={el:e(o)}:(i=o.type,o={data:o,src:o.src}),o.el){for(var r=t.types,a=0;a<r.length;a++)if(o.el.hasClass("mfp-"+r[a])){i=r[a];break}o.src=o.el.attr("data-mfp-src"),o.src||(o.src=o.el.attr("href"))}return o.type=i||t.st.type||"inline",o.index=n,o.parsed=!0,t.items[n]=o,I("ElementParse",o),t.items[n]},addGroup:function(e,n){var i=function(i){i.mfpEl=this,t._openClick(i,e,n)};n||(n={});var o="click.magnificPopup";n.mainEl=e,n.items?(n.isObj=!0,e.off(o).on(o,i)):(n.isObj=!1,n.delegate?e.off(o).on(o,n.delegate,i):(n.items=e,e.off(o).on(o,i)))},_openClick:function(n,i,o){if((void 0!==o.midClick?o.midClick:e.magnificPopup.defaults.midClick)||!(2===n.which||n.ctrlKey||n.metaKey||n.altKey||n.shiftKey)){var r=void 0!==o.disableOn?o.disableOn:e.magnificPopup.defaults.disableOn;if(r)if(e.isFunction(r)){if(!r.call(t))return!0}else if(C.width()<r)return!0;n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),o.el=e(n.mfpEl),o.delegate&&(o.items=i.find(o.delegate)),t.open(o)}},updateStatus:function(e,i){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),i||"loading"!==e||(i=t.st.tLoading);var o={status:e,text:i};I("UpdateStatus",o),e=o.status,i=o.text,t.preloader.html(i),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(h)){var i=t.st.closeOnContentClick,o=t.st.closeOnBgClick;if(i&&o)return!0;if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0;if(n===t.content[0]||e.contains(t.content[0],n)){if(i)return!0}else if(o&&e.contains(document,n))return!0;return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?i.height():document.body.scrollHeight)>(e||C.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){if(n.target!==t.wrap[0]&&!e.contains(t.wrap[0],n.target))return t._setFocus(),!1},_parseMarkup:function(t,n,i){var o;i.data&&(n=e.extend(i.data,n)),I(c,[t,n,i]),e.each(n,function(n,i){if(void 0===i||!1===i)return!0;if((o=n.split("_")).length>1){var r=t.find(f+"-"+o[0]);if(r.length>0){var a=o[1];"replaceWith"===a?r[0]!==i[0]&&r.replaceWith(i):"img"===a?r.is("img")?r.attr("src",i):r.replaceWith(e("<img>").attr("src",i).attr("class",r.attr("class"))):r.attr(o[1],i)}}else t.find(f+"-"+n).html(i)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:v.prototype,modules:[],open:function(t,n){return k(),(t=t?e.extend(!0,{},t):{}).isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},e.fn.magnificPopup=function(n){k();var i=e(this);if("string"==typeof n)if("open"===n){var o,r=y?i.data("magnificPopup"):i[0].magnificPopup,a=parseInt(arguments[1],10)||0;r.items?o=r.items[a]:(o=i,r.delegate&&(o=o.find(r.delegate)),o=o.eq(a)),t._openClick({mfpEl:o},i,r)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1));else n=e.extend(!0,{},n),y?i.data("magnificPopup",n):i[0].magnificPopup=n,t.addGroup(i,n);return i};var T,_,P,S="inline",E=function(){P&&(_.after(P.addClass(T)).detach(),P=null)};e.magnificPopup.registerModule(S,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(S),w(s+"."+S,function(){E()})},getInline:function(n,i){if(E(),n.src){var o=t.st.inline,r=e(n.src);if(r.length){var a=r[0].parentNode;a&&a.tagName&&(_||(T=o.hiddenClass,_=b(T),T="mfp-"+T),P=r.after(_).detach().removeClass(T)),t.updateStatus("ready")}else t.updateStatus("error",o.tNotFound),r=e("<div>");return n.inlineElement=r,r}return t.updateStatus("ready"),t._parseMarkup(i,{},n),i}}});var z,O="ajax",M=function(){z&&e(document.body).removeClass(z)},B=function(){M(),t.req&&t.req.abort()};e.magnificPopup.registerModule(O,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(O),z=t.st.ajax.cursor,w(s+"."+O,B),w("BeforeChange."+O,B)},getAjax:function(n){z&&e(document.body).addClass(z),t.updateStatus("loading");var i=e.extend({url:n.src,success:function(i,o,r){var a={data:i,xhr:r};I("ParseAjax",a),t.appendContent(e(a.data),O),n.finished=!0,M(),t._setFocus(),setTimeout(function(){t.wrap.addClass(m)},16),t.updateStatus("ready"),I("AjaxContentAdded")},error:function(){M(),n.finished=n.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",n.src))}},t.st.ajax.settings);return t.req=e.ajax(i),""}}});var L;e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure onclick="return false;"><span class="mfp-progress-line"><span></span></span><div class="mfp-img hren"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var n=t.st.image,i=".image";t.types.push("image"),w(d+i,function(){"image"===t.currItem.type&&n.cursor&&e(document.body).addClass(n.cursor)}),w(s+i,function(){n.cursor&&e(document.body).removeClass(n.cursor),C.off("resize"+f)}),w("Resize"+i,t.resizeImage),t.isLowIE&&w("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var n=0;t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,L&&clearInterval(L),e.isCheckingImgSize=!1,I("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,i=e.img[0],o=function(r){L&&clearInterval(L),L=setInterval(function(){i.naturalWidth>0?t._onImageHasSize(e):(n>200&&clearInterval(L),3===++n?o(10):40===n?o(50):100===n&&o(500))},r)};o(1)},getImage:function(n,i){var o=0,r=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,I("ImageLoadComplete")):++o<200?setTimeout(r,100):a())},a=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,l=i.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",n.el&&n.el.find("img").length&&(c.alt=n.el.find("img").attr("alt")),n.img=e(c).on("load.mfploader",r).on("error.mfploader",a),c.src=n.src,l.is("img")&&(n.img=n.img.clone()),(c=n.img[0]).naturalWidth>0?n.hasSize=!0:c.width||(n.hasSize=!1)}return t._parseMarkup(i,{title:function(n){if(n.data&&void 0!==n.data.title)return n.data.title;var i=t.st.image.titleSrc;if(i){if(e.isFunction(i))return i.call(t,n);if(n.el)return n.el.attr(i)||""}return""}(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(L&&clearInterval(L),n.loadError?(i.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(i.removeClass("mfp-loading"),t.updateStatus("ready")),i):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,i.addClass("mfp-loading"),t.findImageSize(n)),i)}}});var H;e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,i=".zoom";if(n.enabled&&t.supportsTransition){var o,r,a=n.duration,c=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),i="all "+n.duration/1e3+"s "+n.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},r="transition";return o["-webkit-"+r]=o["-moz-"+r]=o["-o-"+r]=o[r]=i,t.css(o),t},d=function(){t.content.css("visibility","visible")};w("BuildControls"+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.content.css("visibility","hidden"),!(e=t._getItemToZoom()))return void d();(r=c(e)).css(t._getOffset()),t.wrap.append(r),o=setTimeout(function(){r.css(t._getOffset(!0)),o=setTimeout(function(){d(),setTimeout(function(){r.remove(),e=r=null,I("ZoomAnimationEnded")},16)},a)},16)}}),w(l+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.st.removalDelay=a,!e){if(!(e=t._getItemToZoom()))return;r=c(e)}r.css(t._getOffset(!0)),t.wrap.append(r),t.content.css("visibility","hidden"),setTimeout(function(){r.css(t._getOffset())},16)}}),w(s+i,function(){t._allowZoom()&&(d(),r&&r.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return!!t.currItem.hasSize&&t.currItem.img},_getOffset:function(n){var i,o=(i=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem)).offset(),r=parseInt(i.css("padding-top"),10),a=parseInt(i.css("padding-bottom"),10);o.top-=e(window).scrollTop()-r;var s={width:i.width(),height:(y?i.innerHeight():i[0].offsetHeight)-a-r};return void 0===H&&(H=void 0!==document.createElement("p").style.MozTransform),H?s["-moz-transform"]=s.transform="translate("+o.left+"px,"+o.top+"px)":(s.left=o.left,s.top=o.top),s}}});var A="iframe",F=function(e){if(t.currTemplate[A]){var n=t.currTemplate[A].find("iframe");n.length&&(e||(n[0].src="//about:blank"),t.isIE8&&n.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(A,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(A),w("BeforeChange",function(e,t,n){t!==n&&(t===A?F():n===A&&F(!0))}),w(s+"."+A,function(){F()})},getIframe:function(n,i){var o=n.src,r=t.st.iframe;e.each(r.patterns,function(){if(o.indexOf(this.index)>-1)return this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1});var a={};return r.srcAction&&(a[r.srcAction]=o),t._parseMarkup(i,a,n),t.updateStatus("ready"),i}}});var j=function(e){var n=t.items.length;return e>n-1?e-n:e<0?n+e:e},W=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=t.st.gallery,o=".mfp-gallery";if(t.direction=!0,!n||!n.enabled)return!1;r+=" mfp-gallery",w(d+o,function(){n.navigateByImgClick&&t.wrap.on("click"+o,".mfp-img",function(){if(t.items.length>1)return t.next(),!1}),i.on("keydown"+o,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),w("UpdateStatus"+o,function(e,n){n.text&&(n.text=W(n.text,t.currItem.index,t.items.length))}),w(c+o,function(e,i,o,r){var a=t.items.length;o.counter=a>1?W(n.tCounter,r.index,a):""}),w("BuildControls"+o,function(){if(t.items.length>1&&n.arrows&&!t.arrowLeft){var i=n.arrowMarkup,o=t.arrowLeft=e(i.replace(/%title%/gi,n.tPrev).replace(/%dir%/gi,"left")).addClass(h),r=t.arrowRight=e(i.replace(/%title%/gi,n.tNext).replace(/%dir%/gi,"right")).addClass(h);o.click(function(){t.prev()}),r.click(function(){t.next()}),t.container.append(o.add(r))}}),w(p+o,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),w(s+o,function(){i.off(o),t.wrap.off("click"+o),t.arrowRight=t.arrowLeft=null})},next:function(e){t.direction=!0,t.index=j(t.index+1),t.updateItemHTML(),1==e&&Wo_StoryProgress()},prev:function(){t.index=j(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,n=t.st.gallery.preload,i=Math.min(n[0],t.items.length),o=Math.min(n[1],t.items.length);for(e=1;e<=(t.direction?o:i);e++)t._preloadItem(t.index+e);for(e=1;e<=(t.direction?i:o);e++)t._preloadItem(t.index-e)},_preloadItem:function(n){if(n=j(n),!t.items[n].preloaded){var i=t.items[n];i.parsed||(i=t.parseEl(n)),I("LazyLoad",i),"image"===i.type&&(i.img=e('<img class="mfp-img"/>').on("load.mfploader",function(){i.hasSize=!0}).on("error.mfploader",function(){i.hasSize=!0,i.loadError=!0,I("LazyLoadError",i)}).attr("src",i.src)),i.preloaded=!0}}}});var N="retina";e.magnificPopup.registerModule(N,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio;(n=isNaN(n)?n():n)>1&&(w("ImageHasSize."+N,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),w("ElementParse."+N,function(t,i){i.src=e.replaceSrc(i,n)}))}}}}),k()});
!function(t){t.rcrop={settings:{full:!1,minSize:[20,20],maxSize:[null,null],preserveAspectRatio:!1,inputs:!0,inputsPrefix:"",grid:!1,preview:{display:!1,size:[50,50],wrapper:""}}},ResponsiveCrop=function(e,i){var r=this,a="rcrop-",o={x:0,y:0,width:0,height:0};this.el=e instanceof t?e:t(e),this.image={instance:null,width:0,height:0},this.wrapper=t("<div>",{class:"rcrop-wrapper"}),this.cropArea=t("<div>",{class:"rcrop-croparea"}),this.cropData={width:0,height:0,x:0,y:0},this.outer={wrapper:t("<div>",{class:"rcrop-outer-wrapper"}),left:t("<div>",{class:"rcrop-outer rcrop-outer-left"}),right:t("<div>",{class:"rcrop-outer rcrop-outer-right"}),top:t("<div>",{class:"rcrop-outer rcrop-outer-top"}),bottom:t("<div>",{class:"rcrop-outer rcrop-outer-bottom"})},this.cropAspectRatio,this.preview=null,this.clayfy,this.settings=t.extend(!0,{},t.rcrop.settings,i);var n=function(){if(r.wrapper.insertAfter(r.el),r.wrapper.append(r.el),r.wrapper.append(r.outer.wrapper),r.outer.wrapper.append(r.outer.left,r.outer.right,r.outer.top,r.outer.bottom),r.wrapper.append(r.cropArea),r.cropArea.append('<div class="rcrop-croparea-inner">'),r.settings.grid){var e='<div class="rcrop-grid-line"></div>';r.cropArea.append('<div class="rcrop-grid">'+e+e+"</div>")}if(p(),r.settings.inputs){var i=0!=r.settings.inputsPrefix?r.settings.inputsPrefix+"-":"",a=["x","y","width","height"];t.each(a,function(t,e){r.wrapper.append('<input type="hidden" name="'+i+e+'[]">')})}},p=function(){var e=t('<div class="rcrop-handler-wrapper"></div>');isTouchDevice()?e.append('<div class="rcrop-handler-bottom-right rcrop-handler-corner""></div>'):(t.each(["top-left","top-right","bottom-left","bottom-right"],function(t,i){e.append('<div class="rcrop-handler-'+i+" "+a+'handler-corner""></div>')}),t.each(["top","right","bottom","left"],function(t,i){e.append('<div class="rcrop-handler-'+i+" "+a+'handler-border"></div>')})),r.cropArea.append(e)},c=function(){var t=r.cropArea.position();o={width:Math.round(r.cropArea.width()),height:Math.round(r.cropArea.height()),x:Math.round(t.left),y:Math.round(t.top)}},h=function(){var t=r.cropArea.position(),e=o.width!==Math.round(r.cropArea.width()),i=o.height!==Math.round(r.cropArea.height()),a=o.x!==Math.round(t.left),n=o.y!==Math.round(t.top);s(e,i,a,n)},s=function(e,i,a,o){if(!1!==e&&(r.cropData.width="number"==typeof e?e:z(r.clayfy.newSize.width),r.cropData.width=Math.max(r.cropData.width,r.settings.minSize[0]),r.settings.maxSize[0]&&(r.cropData.width=Math.min(r.cropData.width,r.settings.maxSize[0]))),!1!==i&&(r.cropData.height="number"==typeof i?i:z(r.clayfy.newSize.height),r.cropData.height=Math.max(r.cropData.height,r.settings.minSize[1]),r.settings.maxSize[1]&&(r.cropData.height=Math.min(r.cropData.height,r.settings.maxSize[1]))),(!1!==i||!1!==e)&&r.settings.preserveAspectRatio){var n={max:r.settings.maxSize[0]||r.image.width,min:r.settings.minSize[0]};r.cropData.height*r.cropAspectRatio>n.max||r.cropData.height*r.cropAspectRatio<n.min?r.cropData.height=Math.round(r.cropData.width/r.cropAspectRatio):r.cropData.width=Math.round(r.cropData.height*r.cropAspectRatio)}!1!==a&&(r.cropData.x="number"==typeof a?a:z(r.clayfy.newSize.left),r.cropData.x+r.cropData.width>r.image.width&&(r.cropData.x=r.image.width-r.cropData.width)),!1!==o&&(r.cropData.y="number"==typeof o?o:z(r.clayfy.newSize.top),r.cropData.y+r.cropData.height>r.image.height&&(r.cropData.y=r.image.height-r.cropData.height)),r.settings.inputs&&t.each(["width","height","x","y"],function(t,e){r.wrapper.find('[name$="'+e+'[]"]').val(r.cropData[e])}),r.settings.preview.display&&w()},g=function(){var t=r.el[0].getBoundingClientRect(),e=t.width,i=t.height,a=r.clayfy.newSize,o={width:a.width,height:a.height,top:a.top,left:a.left};r.cropArea.css({width:o.width/e*100+"%",height:o.height/i*100+"%",top:o.top/i*100+"%",left:o.left/e*100+"%"}),r.outer.left.width(o.left/e*100+"%"),r.outer.top.height(o.top/i*100+"%"),r.outer.bottom.css({top:(o.top+o.height)/i*100+"%"}),r.outer.right.css({left:(o.left+o.width)/e*100+"%"})},d=function(){var t=r.clayfy.newSize;r.outer.left.width(t.left),r.outer.top.height(t.top),r.outer.bottom.css({top:t.top+t.outerHeight}),r.outer.right.css({left:t.left+t.outerWidth})},l=function(){var t=r.settings,e=r.clayfy.settings;e.minSize=v(t.minSize),e.maxSize=v(t.maxSize),r.clayfy.draggable.setBounderies()},f=function(){var t=r.settings;r.cropArea.clayfy({type:"resizable",container:r.wrapper,preserveAspectRatio:t.preserveAspectRatio,minSize:v(t.minSize),maxSize:v(t.maxSize)}),r.clayfy=r.cropArea.clayfy("instance"),r.clayfy.originalSize.width=r.settings.minSize[0],r.clayfy.originalSize.height=r.settings.minSize[1];var e=t.full?r.image.height:Math.max(.8*r.image.height,t.minSize[1]),i=t.full?r.image.width:Math.max(.8*r.image.width,t.minSize[0]);r.resize(i,e,"center","center"),r.cropArea.on("mousedown touchstart",l),r.cropArea.on("clayfy-resizestart clayfy-dragstart",c),r.cropArea.on("clayfy-resizeend clayfy-drop",h),r.cropArea.on("clayfy-resize clayfy-drag",d),r.settings.preview.display&&(r.cropArea.on("clayfy-resize clayfy-drag",w),r.cropArea.on("clayfy-cancel",w)),r.cropArea.on("clayfy-resizeend clayfy-drop",g),r.cropArea.on("clayfy-cancel",g),r.cropArea.on("clayfy-resizeend clayfy-drop",function(){r.el.trigger("rcrop-changed",[r])}),r.cropArea.on("clayfy-drag clayfy-resize",function(){r.el.trigger("rcrop-change",[r])})},u=function(){var t=r.settings.preview.size,e=[],i=r.clayfy?r.clayfy.newSize:{width:r.cropArea.width(),height:r.cropArea.height()};return"string"==typeof t[0]&&t[0].indexOf("%")>-1?e[0]=Number(t[0].replace("%",""))/100*i.width:e[0]=t[0],"string"==typeof t[1]&&t[1].indexOf("%")>-1?e[1]=Number(t[1].replace("%",""))/100*i.height:e[1]=t[1],e},y=function(){var e=r.settings.preview.wrapper;e&&(e=e instanceof t?e:t(e)),e&&e.length||(e=t("<div>",{class:"rcrop-preview-wrapper"}),r.wrapper.after(e));var i=u();r.preview=t('<canvas width="'+i[0]+'" height="'+i[1]+'"></canvas>'),r.preview.appendTo(e)},w=function(t){var e=r.cropData;t&&(e=z({width:r.clayfy.newSize.width,height:r.clayfy.newSize.height,x:r.clayfy.newSize.left,y:r.clayfy.newSize.top}));var i=u();r.preview.attr({width:i[0],height:i[1]}),r.preview[0].getContext("2d").drawImage(r.image.instance,e.x,e.y,e.width,e.height,0,0,i[0],i[1])},m=function(t,e){if("object"==typeof t){var i=t instanceof Array?[]:{};for(var r in t)i[r]="number"!=typeof t[r]?null:Math.round(t[r]*e);return i}return Math.round(t*e)},v=function(t){return m(t,r.el.width()/r.image.width)},z=function(t){return m(t,r.image.width/r.el.width())};this.getValues=function(){return{width:r.cropData.width,height:r.cropData.height,y:r.cropData.y,x:r.cropData.x}},this.getRealSize=function(t){var e=new Image;e.onload=function(){return r.image.width=this.width,r.image.height=this.height,"function"==typeof t&&t(),{width:r.image.width,height:r.image.height}},e.onerror=function(){return{width:null,height:null}},e.src=r.el.attr("src"),r.image.instance=e},this.getDataURL=function(e,i){e=e||r.cropData.width,i=i||r.cropData.height;var a=t('<canvas width="'+e+'" height="'+i+'"></canvas>');return a[0].getContext("2d").drawImage(r.image.instance,r.cropData.x,r.cropData.y,r.cropData.width,r.cropData.height,0,0,e,i),a[0].toDataURL()},this.resize=function(t,e,i,a){var o,n,p,c,h=r.settings;t=h.maxSize[0]?Math.min(t,r.image.width,h.maxSize[0]):Math.min(t,r.image.width),e=h.maxSize[1]?Math.min(e,r.image.height,h.maxSize[1]):Math.min(e,r.image.height),t=h.minSize[0]?Math.max(t,h.minSize[0]):t,e=h.minSize[1]?Math.max(e,h.minSize[1]):e,h.preserveAspectRatio&&(t/e>r.cropAspectRatio?t=e*r.cropAspectRatio:e=t/r.cropAspectRatio),t=Math.round(t),e=Math.round(e),o=v(t),n=v(e),(a=void 0===a?r.cropArea.position().top:"center"===a?Math.round((r.image.height-e)/2):Math.round(a))+e>r.image.height&&(a=r.image.height-e),c=v(a),(i=void 0===i?r.cropData.x?z(r.cropArea.position().left):r.cropData.x:"center"===i?Math.round((r.image.width-t)/2):Math.round(i))+t>r.image.width&&(i=r.image.width-t),p=v(i),r.cropArea.css({width:o,height:n,top:c,left:p}),r.clayfy.newSize=r.clayfy.getNewSize(),s(t,e,i,a),d(),g(),r.settings.preview.display&&w()},this.destroy=function(){var t=r.el;r.wrapper.replaceWith(t),t.attr("style","")},function(){r.cropAspectRatio=r.settings.minSize[0]/r.settings.minSize[1],n(),r.settings.preview.display&&y(),r.getRealSize(function(){f(),r.el.trigger("rcrop-ready")})}()};var e=ResponsiveCrop;t.fn.rcrop=function(i){var r=arguments;if(void 0===i||"object"==typeof i)return this.each(function(){t.data(this,"rcrop")||t.data(this,"rcrop",new e(this,i))});if("string"==typeof i&&"_"!==i[0]&&"init"!==i){if("instance"===i)return this.length?t.data(this[0],"rcrop"):null;if(-1!=t.inArray(i,t.fn.rcrop.getters)){var a=t.data(this[0],"rcrop");return a[i].apply(a,Array.prototype.slice.call(r,1))}return this.each(function(){var a=t.data(this,"rcrop");a instanceof e&&"function"==typeof a[i]&&a[i].apply(a,Array.prototype.slice.call(r,1))})}},t.fn.rcrop.getters=["getDataURL","getValues","getRealSize"]}(jQuery);
!function(){function e(e,i){function o(e){return e.el[0].scrollHeight-e.el.scrollTop()===e.innerHeight}function r(e){return e.el[0].scrollWidth-e.el.scrollLeft()===e.innerWidth}this.el=e instanceof $?e:$(e),this.draggableBox,this.x,this.y,this.dX,this.dY,this.diffDX,this.diffDY,this.history={dX:[0,0,0],dY:[0,0,0],diffDX:0,diffDY:0},this.actualPos,this.originalPos,this.initPos={y:0,x:0,scrollTop:null,scrollLeft:null},this.bounderies={},this.droppedTarget,this.scrollable=[],this.container={},this.tempContainer=$("<div>",{style:"position: absolute; top:0; left:0"}),this.droppable={dragElement:[],dropArea:[]},this.status="ready",this.settings=$.extend(!0,{},$.clayfy.settings,i);var a,n,s=this,l=!1,d=!0,g=$("<div>",{style:"height:100%;width:100%;position:fixed;top:0;left:0"});this.contentGhost;var p=function(){s.settings.ghost?(!0===s.settings.ghost?(s.draggableBox=s.el.clone(),s.draggableBox.addClass("clayfy-ghost-opacity")):(s.draggableBox=$("<div>",{margin:s.el.css("margin")}),s.contentGhost=$('<div class="clayfy-ghost-content" style="position:absolute"></div>'),s.draggableBox.append(s.contentGhost)),s.draggableBox.css({position:"absolute",width:"100%",height:"100%"}).addClass("clayfy-ghost")):s.draggableBox=s.el},f=function(e){var t=s.getPosition(s.el),i=s.settings.overflow?s.tempContainer:s.el.parent(),o=s.el.offset(),r=s.initPos.parent?s.initPos.parent.scrollTop():0,a=s.initPos.parent?s.initPos.parent.scrollLeft():0,n={width:s.el.width(),height:s.el.height(),top:t.y,left:t.x};if(!0!==s.settings.ghost&&(n={top:e.pageY-o.top+t.y+5-r,left:e.pageX-o.left+t.x+5-a,width:"auto",height:"auto"}),s.settings.overflow&&(n.top=o.top-r,n.left=o.left-a,!0!==s.settings.ghost&&(n.top=e.pageY-r+5,n.left=e.pageX-a+5)),s.draggableBox.css(n),s.draggableBox.appendTo(i),s.contentGhost){s.contentGhost.html("");var l;switch(typeof s.settings.ghost){case"string":l=s.settings.ghost;break;case"function":l=s.settings.ghost()}if(s.contentGhost.append(l),s.container.offset){var d=s.container.offset.innerBottom,g=s.container.offset.innerRight,p=s.draggableBox.offset(),f=p.top+s.contentGhost.outerHeight()-d,c=p.left+s.contentGhost.outerWidth()-g;f>0&&s.draggableBox.css({top:e.pageY-o.top+t.y+5-f}),c>0&&s.draggableBox.css({left:e.pageX-o.left+t.x+5-c})}}},c=function(e){if("canceling"!==s.status&&s.settings.move){var t=s.getPosition(),i=s.draggableBox.offset();s.contentGhost?s.contentGhost:s.draggableBox;if(s.container.offset){var o=s.container.offset.innerBottom,r=s.container.offset.innerRight;i.top>=o-s.el.outerHeight()&&(t.y+=o-s.el.outerHeight()-i.top),i.left>=r-s.el.outerWidth()&&(t.x+=r-s.el.outerWidth()-i.left)}if(s.el.css({top:t.y,left:t.x}),"clayfy-dropinside"===e.type){var o=e.area.offset.innerBottom,r=e.area.offset.innerRight;i.top>=o-s.el.outerHeight()&&(t.y+=o-s.el.outerHeight()-i.top),i.left>=r-s.el.outerWidth()&&(t.x+=r-s.el.outerWidth()-i.left),s.el.css({top:t.y,left:t.x})}}s.draggableBox.detach()},h=function(){var e=s.settings.container;e instanceof t?s.container=e:s.settings.container&&(s.container=new t(s.el,e))},y=function(e){27===e.keyCode&&s.cancel(e)};this.cancel=function(e){s.status="canceling",s.draggableBox.animate({top:s.initPos.y,left:s.initPos.x},100,function(){s.draggableBox.trigger("mouseup"),s.status="ready"}),null!==s.initPos.scrollTop&&s.initPos.parent.animate({scrollTop:s.initPos.scrollTop},100),null!==s.initPos.scrollLeft&&s.initPos.parent.animate({scrollLeft:s.initPos.scrollLeft},100)},s.scrollables=[];var u,b,v,m,x=function(){$(s.settings.scrollable).each(function(){var e=$(this);if(!e.length)return!0;var t=w(e);if(!t.x&&!t.y)return!0;var i=e[0].getBoundingClientRect(),o=z(e),r=parseInt(e.css("border-top-width")),a=parseInt(e.css("border-left-width")),n={el:e,top:i.top+r,bottom:i.top+o.innerHeight+r,left:i.left+a,right:i.left+o.innerWidth+a,innerHeight:o.innerHeight,innerWidth:o.innerWidth,interval:{top:!1,bottom:!1,left:!1,right:!1},isParent:!s.settings.overflow&&s.el.offsetParent().is(e),isBody:e.is("body")};if(n.isBody){var l=$(window);n.top=0,n.left=0,n.bottom=l.height(),n.right=l.width(),n.innerHeight=l.height(),n.innerWidth=l.width()}s.scrollables.push(n)})},w=function(e){var t=!1,i=!1,o=$(window),r=$("body");return e.is("body")?(r.height()>o.height()&&(i=!0),r.width()>o.width()&&(t=!0)):(e[0].scrollHeight>e.height()&&(i=!0),e[0].scrollWidth>e.width()&&(t=!0)),{x:t,y:i}},z=function(e){var t,i,o,r,a,n,s,l=e instanceof $?e:$(e);return l.length?(t=l[0].style.position,"static"===l.css("position")&&l.css({position:"relative"}),o=$("<div>",{style:"position:absolute;top:0;left:0;bottom:0;right:0"}),i=$("<div>",{style:"position:absolute;top:0;left:0;width:100%;height:100%"}),o.append(i),l.append(o),r=i.width(),a=i.height(),n=parseInt(i.css("border-top-width")),s=parseInt(i.css("border-left-width")),o.remove(),l[0].style.position=t,{innerWidth:r,innerHeight:a,innerOffset:{top:n,left:s,bottom:a+n,right:r+s}}):{width:0,height:0}},B=function(e){var t=s.contentGhost?s.contentGhost:s.draggableBox,i=s.draggableBox[0].getBoundingClientRect(),a=t.offset(),n={top:i.top,bottom:i.top+t.outerHeight(),left:i.left,right:i.left+t.outerWidth(),x:0,y:0};n.x=(n.right-n.left)/2+n.left,n.y=(n.bottom-n.top)/2+n.top,s.history.diffDY>0&&u&&(u=!1,s.y=Math.min(a.top+t.outerHeight(),e.pageY)),s.history.diffDY<0&&b&&(b=!1,s.y=Math.max(a.top,e.pageY)),s.history.diffDX>0&&m&&(m=!1,s.x=Math.min(a.left+t.outerWidth(),e.pageX)),s.history.diffDX<0&&v&&(v=!1,s.x=Math.max(a.left,e.pageX));for(var l=0,d=s.scrollables.length;l<d;l++){var g=s.scrollables[l],p=0,f={top:n.top-g.top,bottom:g.bottom-n.bottom,left:n.left-g.left,right:g.right-n.right,x:n.x<g.right&&n.x>g.left,y:n.y<g.bottom&&n.y>g.top};if(!o(g)&&f.bottom<6&&(f.bottom>-6||g.isBody)&&f.x?(P(e,g,"bottom"),D(g,"top"),p++):(D(g,"bottom"),g.el.scrollTop()&&f.top<6&&(f.top>-6||g.isBody)&&f.x?(P(e,g,"top"),p++):D(g,"top")),g.el.scrollLeft()&&f.left<6&&(f.left>-6||g.isBody)&&f.y?(P(e,g,"left"),D(g,"right"),p++):(D(g,"left"),!r(g)&&f.right<6&&(f.right>-6||g.isBody)&&f.y?(P(e,g,"right"),p++):D(g,"right")),p)break}},P=function(e,t,i){t.interval[i]&&clearInterval(t.interval[i]);var o=function(e){};switch(i){case"bottom":o=function(i){i=i||10,t.el.scrollTop(t.el.scrollTop()+i),t.isParent&&(s.x=e.pageX,s.setBounderies(),s.updateDropArea(),u=!0)};break;case"top":o=function(i){i=i||10,t.el.scrollTop(t.el.scrollTop()-i),t.isParent&&(s.x=e.pageX,s.setBounderies(),s.updateDropArea(),b=!0)};break;case"left":o=function(i){i=i||10,t.el.scrollLeft(t.el.scrollLeft()-i),t.isParent&&(s.y=e.pageY,s.setBounderies(),s.updateDropArea(),v=!0)};break;case"right":o=function(i){i=i||10,t.el.scrollLeft(t.el.scrollLeft()+i),t.isParent&&(s.y=e.pageY,s.setBounderies(),s.updateDropArea(),m=!0)}}o(3),t.isParent||(t.interval[i]=setInterval(o,50))},D=function(e,t){if(t)e.interval[t]&&(clearInterval(e.interval[t]),e.interval[t]=!1);else for(var i in s.scrollables){var o=s.scrollables[i].interval;for(var r in o)o[r]&&(clearInterval(o[r]),o[r]=!1)}};this.appendTo=function(e,t){if(t=t||s.el,(e=e instanceof $?e:$(e)).length){var i=t.offset(),o=e.offset(),r={top:i.top-o.top-parseInt(e.css("border-top-width"))+e.scrollTop(),left:i.left-o.left-parseInt(e.css("border-left-width"))+e.scrollLeft()};"static"===e.css("position")&&e.css("position","relative"),t.appendTo(e).css(r)}};var S=function(){s.el.on("clayfy-dragstart",s.updateDragElement),s.el.on("clayfy-dragstart",s.updateDropArea),s.el.on("clayfy-drag",H),s.el.on("clayfy-drop",W),s.settings.ghost&&(s.el.on("clayfy-dropinside",c),s.el.on("clayfy-dropoutside",c)),s.el.on("clayfy-dragstart",function(){X()||(s.el.removeClass("clayfy-dropinside"),s.draggableBox.removeClass("clayfy-dropinside"))}),s.el.on("clayfy-dragenter",function(e){s.el.addClass("clayfy-dragenter"),s.draggableBox.addClass("clayfy-dragenter"),e.droparea.addClass("clayfy-dragenter"),s.el[0].id&&e.droparea.addClass("clayfy-dragenter-"+s.el[0].id)}),s.el.on("clayfy-dragleave",function(e){s.el.removeClass("clayfy-dropinside"),s.draggableBox.removeClass("clayfy-dropinside"),e.droparea.removeClass("clayfy-dropinside"),s.el[0].id&&e.droparea.removeClass("clayfy-dropinside-"+s.el[0].id)}),s.el.on("clayfy-dragleave clayfy-drop",function(e){s.el.removeClass("clayfy-dragenter"),s.draggableBox.removeClass("clayfy-dragenter"),$(".clayfy-dragenter").removeClass("clayfy-dragenter"),s.el[0].id&&$(".clayfy-dragenter-"+s.el[0].id).removeClass("clayfy-dragenter-"+s.el[0].id)}),s.el.on("clayfy-dropinside",function(e){s.el.addClass("clayfy-dropinside"),s.draggableBox.addClass("clayfy-dropinside"),e.droparea.addClass("clayfy-dropinside"),s.el[0].id&&e.droparea.addClass("clayfy-dropinside-"+s.el[0].id),s.settings.migrate&&s.appendTo(e.droparea)})};this.updateDropArea=function(e){s.droppable.dropArea=[];var t=s.settings.droppable instanceof $?s.settings.droppable:$(s.settings.droppable);s.addDroppable(t)},this.updateDragElement=function(){s.droppable.dragElement=[],s.droppable.dragElement={originalPos:s.getPosition(),id:s.el[0].id,originalDropArea:null,width:s.draggableBox.width(),height:s.draggableBox.height(),x:0,y:0};var e=s.droppable.dragElement;e.setCenter=function(){var t=s.draggableBox.offset();e.x=t.left+e.width/2,e.y=t.top+e.height/2},e.setCenter(),e.originalDropArea=X()},this.resetDroppable=function(e){e&&(s.settings.droppable=e),s.updateDragElement(),s.updateDropArea()},this.addDroppable=function(e){(e instanceof $?e:$(e)).each(function(){var e=$(this),t=e.offset(),i=e.outerHeight(),o=e.outerWidth(),r=parseInt(e.css("border-top-width")),a=parseInt(e.css("border-left-width")),n=$.clayfy.getInner(e);s.droppable.dropArea.push({el:e,id:this.id,left:t.left,top:t.top,width:o,height:i,innerWidth:n.innerWidth,innerHeight:n.innerHeight,offset:{innerTop:t.top+r,innerLeft:t.left+a,innerBottom:n.innerHeight+t.top+r,innerRight:n.innerWidth+t.left+a},right:t.left+o,bottom:t.top+i,active:!1,triggered:!1})})};var H=function(e){var t=s.droppable.dragElement;t.setCenter();for(var i=0,o=s.droppable.dropArea.length;i<o;i++){var r=s.droppable.dropArea[i];r&&(t.x>r.left&&t.x<r.right&&t.y>r.top&&t.y<r.bottom?r.active=!0:r.active=!1,!r.triggered&&r.active?(r.triggered=!0,s.el.trigger($.Event("clayfy-dragenter",{target:r.el[0],droparea:r.el}))):r.triggered&&!r.active&&(r.triggered=!1,s.el.trigger($.Event("clayfy-dragleave",{target:r.el[0],droparea:r.el,area:r}))))}},X=function(){var e=s.droppable.dragElement;e.setCenter();for(var t=!1,i=0,o=s.droppable.dropArea.length;i<o;i++){var r=s.droppable.dropArea[i];r&&(e.x>r.left&&e.x<r.right&&e.y>r.top&&e.y<r.bottom&&(r.active=!0,r.triggered=!0,t=r))}return t},Y=function(e){var t=s.contentGhost?s.contentGhost:s.draggableBox,i={},o=s.el.offset(),r={top:o.top,left:o.left,right:s.droppable.dragElement.width+o.left,bottom:s.droppable.dragElement.height+o.top};t.outerWidth()<e.innerWidth&&(r.right>e.offset.innerRight&&(i.left=parseInt(t.css("left"))+e.offset.innerRight-r.right),r.left<e.offset.innerLeft&&(i.left=parseInt(t.css("left"))+e.offset.innerLeft-r.left)),t.outerHeight()<e.innerHeight&&(r.bottom>e.offset.innerBottom&&(i.top=parseInt(t.css("top"))+e.offset.innerBottom-r.bottom),r.top<e.offset.innerTop&&(i.top=parseInt(s.el.css("top"))+e.offset.innerTop-r.top)),s.el.css(i)},A=function(){var e=s.droppable.dragElement.originalDropArea;e&&s.el.trigger($.Event("clayfy-dropinside",{target:e.el[0],droparea:e.el})),s.settings.overflow&&!s.settings.ghost?s.el.css({left:s.initPos.x-s.initPos.parent.offset().left-parseInt(s.initPos.parent.css("border-left-width"))+s.initPos.scrollLeft,top:s.initPos.y-s.initPos.parent.offset().top-parseInt(s.initPos.parent.css("border-top-width"))+s.initPos.scrollTop}):s.el.css({left:s.initPos.x,top:s.initPos.y})},W=function(){for(var e,t=0,i=s.droppable.dropArea.length;t<i;t++)s.droppable.dropArea[t].active&&(e=s.droppable.dropArea[t]);if("canceling"===s.status){if(e&&(e.active=!1,e.triggered=!1,s.el.trigger($.Event("clayfy-dragleave",{target:e.el[0],droparea:e.el}))),!(e=s.droppable.dragElement.originalDropArea))return;e.active=!0,e.triggered=!0}e?(s.el.trigger($.Event("clayfy-dropinside",{target:e.el[0],droparea:e.el,area:e})),s.settings.fit&&Y(e)):(s.el.trigger("clayfy-dropoutside"),s.settings.dropoutside||A(),s.settings.dropoutside&&s.settings.migrate&&s.settings.overflow&&s.appendTo(s.tempContainer)),e&&(s.droppedTarget=e.el[0])},T=function(e){var t=e.pageX-s.el.offset().left,i=e.pageY-s.el.offset().top,o=$("<div>",{style:"position:absolute;left:0;top:0;width:100%;height:100%"});s.el.append(o);var r=o.width(),a=o.height();return o.remove(),!(t>r)&&!(i>a)},C=function(e){n.is(e.target)||s.el.has(e.target).length&&!s.settings.propagate||(isTouchDevice()||void 0===e.which||1===e.which)&&(e.preventDefault(),T(e)&&(s.settings.coverScreen&&E(),l=!0,document.body.style.cursor=a,s.settings.dragstart.call(s,e),s.el.trigger("clayfy-dragstart"),$(document).on("mousemove touchmove",I).on("mouseup touchend",R)))},R=function(e){if(l){e.preventDefault(),l=!1,d=!0,document.body.style.cursor="",s.settings.overflow&&(s.appendTo(s.initPos.parent,s.draggableBox),s.appendTo(s.initPos.parent)),s.settings.coverScreen&&k(),s.settings.drop.call(s);var t=$.Event("clayfy-drop",{pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY});s.el.trigger(t),$(document).off("mousemove touchmove",I).off("mouseup touchend",R)}},I=function(e){if(l){if(e.preventDefault(),e.originalEvent.touches&&1==e.originalEvent.touches.length)var e=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];if(d){d=!1;var t=s.el.parent();s.initPos.parent=t,s.settings.overflow&&s.appendTo(s.tempContainer,s.draggableBox),s.settings.ghost&&f(e),s.x=e.pageX,s.y=e.pageY,s.setBounderies();var i=s.getPosition(s.el);s.initPos={x:i.x,y:i.y,scrollLeft:t.scrollLeft(),scrollTop:t.scrollTop(),parent:t},s.history={dX:[0,0,0],dY:[0,0,0],diffDX:0,diffDY:0}}s.dX=e.pageX-s.x,s.dY=e.pageY-s.y,$.clayfy.dX=s.dX,$.clayfy.dY=s.dY,s.history.diffDX=(s.history.dX[0]+s.history.dX[1]-(s.history.dX[2]+s.dX))/2,s.history.diffDY=(s.history.dY[0]+s.history.dY[1]-(s.history.dY[2]+s.dY))/2,s.history.dX=[s.history.dX[1],s.history.dX[2],s.dX],s.history.dY=[s.history.dY[1],s.history.dY[2],s.dY],s.fixDeltasWithBounderies(),(s.settings.move||s.settings.ghost)&&s.move(),s.settings.drag.call(s,e);var o=$.Event("clayfy-drag",{shiftKey:e.shiftKey,pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY,altKey:e.altKey});s.el.trigger(o)}},E=function(){$("body").append(g)},k=function(){g.detach()};this.getContainerBounderies=function(){if(!s.container.type)return!1;var e,t,i=s.draggableBox.offset(),o={};return s.container.update(),e=s.contentGhost?s.contentGhost.outerWidth():s.draggableBox.outerWidth(),t=s.contentGhost?s.contentGhost.outerHeight():s.draggableBox.outerHeight(),o={top:i.top-s.container.offset.innerTop,right:s.container.offset.innerRight-i.left-e,bottom:s.container.offset.innerBottom-i.top-t,left:i.left-s.container.offset.innerLeft},isNaN(o.top)&&(o={top:1e13,right:1e13,bottom:1e13,left:1e13}),o},this.setBounderies=function(){var e=s.settings.bounderies;s.actualPos=s.getPosition(),s.bounderies={top:-e[0],right:e[1],bottom:e[2],left:-e[3]};var t=s.getContainerBounderies();t&&(s.bounderies={top:Math.max(-t.top,s.bounderies.top),right:Math.min(t.right,s.bounderies.right),bottom:Math.min(t.bottom,s.bounderies.bottom),left:Math.max(-t.left,s.bounderies.left)})},this.move=function(){s.draggableBox.css({top:s.actualPos.y+$.clayfy.dY,left:s.actualPos.x+$.clayfy.dX})},this.getPosition=function(e){var t,i=s.el.offsetParent(),o=(t=void 0===e?s.draggableBox||s.el:e).position();return{y:o.top+i.scrollTop(),x:o.left+i.scrollLeft()}},this.fixDeltasWithBounderies=function(){$.clayfy.dX>s.bounderies.right&&($.clayfy.dX=s.bounderies.right),$.clayfy.dX<s.bounderies.left&&($.clayfy.dX=s.bounderies.left),$.clayfy.dY<s.bounderies.top&&($.clayfy.dY=s.bounderies.top),$.clayfy.dY>s.bounderies.bottom&&($.clayfy.dY=s.bounderies.bottom),s.settings.moveX||($.clayfy.dX=0),s.settings.moveY||($.clayfy.dY=0)},this.destroy=function(){},function(){s.originalPos=s.getPosition(),s.actualPos=s.originalPos,h(),p(),s.el.addClass("clayfy-box"),s.settings.move||s.el.addClass("clayfy-not-move"),a=s.el.css("cursor"),n=$(s.settings.not),s.settings.overflow&&$("body").append(s.tempContainer),s.el.on("mousedown touchstart",C),$("body").on("mouseup touchend",R),s.settings.escape&&(s.el.on("clayfy-dragstart",function(e){e.stopPropagation(),$(window).on("keydown",y)}),s.el.on("clayfy-drop",function(){$(window).off("keydown",y)})),!1!==s.settings.scrollable&&"node"===s.container.type&&(s.settings.container instanceof t||("string"==typeof s.settings.scrollable?s.settings.scrollable=s.settings.scrollable?s.settings.scrollable+" , "+s.settings.container:s.settings.container:s.settings.scrollable instanceof $&&(s.settings.scrollable=s.settings.scrollable.add(s.settings.container)))),s.el.on("clayfy-dragstart",x),s.el.on("clayfy-drag",B),s.el.on("clayfy-drop",D),0!=s.settings.droppable?(s.updateDragElement(),s.updateDropArea(),S()):s.settings.ghost&&s.el.on("clayfy-drop",c)}()}function t(e,t){this.draggableEl=e instanceof $?e:$(e),this.values,this.el,this.type,this.originalDraggable,this.width=0,this.height=0,this.innerHeight=0,this.innerWidth=0,this.offset={top:0,left:0,innerBottom:0,innerRight:0,innerLeft:0,innerTop:0};var i=this,o=function(){var e=a(i.el);i.width=i.el.width(),i.height=i.el.height(),i.innerWidth=e.innerWidth,i.innerHeight=e.innerHeight,i.offset=i.el.offset(),i.offset.innerTop=i.offset.top+parseInt(i.el.css("border-top-width")),i.offset.innerLeft=i.offset.left+parseInt(i.el.css("border-left-width")),i.offset.innerBottom=i.offset.innerTop+i.innerHeight,i.offset.innerRight=i.offset.innerLeft+i.innerWidth},r=function(){var e=i.getDraggableValues();i.offset={top:e.offset.top-(e.position.top-i.originalDraggable.position.top)-i.values[0],left:e.offset.left-(e.position.left-i.originalDraggable.position.left)-i.values[3]},i.width=i.originalDraggable.outerWidth+i.values[3]+i.values[1],i.height=i.originalDraggable.outerHeight+i.values[0]+i.values[2],i.innerWidth=i.width,i.innerHeight=i.height,i.offset.innerTop=i.offset.top,i.offset.innerLeft=i.offset.left,i.offset.innerBottom=i.offset.top+i.height,i.offset.innerRight=i.offset.left+i.width},a=function(e){var t,i,o,r,a,n=e instanceof $?e:$(e);return n.length?(t=n[0].style.position,"static"===n.css("position")&&n.css({position:"relative"}),o=$("<div>",{style:"position:absolute;top:0;left:0;bottom:0;right:0"}),i=$("<div>",{style:"position:absolute;top:0;left:0;width:100%;height:100%"}),o.append(i),n.append(o),r=i.width(),a=i.height(),o.remove(),n[0].style.position=t,{innerWidth:r,innerHeight:a}):{width:0,height:0}};this.getDraggableValues=function(){var e=i.draggableEl.offset(),t=i.draggableEl.offsetParent();return{position:{top:i.draggableEl.position().top+t.scrollTop(),left:i.draggableEl.position().left+t.scrollLeft()},offset:e,outerWidth:i.draggableEl.outerWidth(),outerHeight:i.draggableEl.outerHeight()}},function(){"string"==typeof t||t instanceof $?(i.el=t instanceof $?t:$(t),i.type="node","static"===i.el.css("position")&&i.el.css("position","relative"),i.update=o):(i.values=t,i.type="object",i.update=r,i.originalDraggable=i.getDraggableValues()),i.update()}()}function i(t,i){this.el=t instanceof $?t:$(t),this.originalSize={},this.initSize={},this.handlers=[],this.actualSize,this.newSize,this.draggable,this.preserveAspectRatio=!1,this.shift=!1,this.status="ready",this.touchableDevice;var r=$.extend(!0,{},$.clayfy.settings,{callbacks:{resizestart:function(){},resize:function(){},resizeend:function(){}}});this.settings=$.extend(!0,{},r,i);var a,n=this,s=!1,l=function(e){27===e.keyCode&&n.cancel()},d=function(){var t=["top left","top right","bottom left","bottom right","left","right","top","bottom"];n.touchableDevice&&(t=["bottom right"]),"static"===n.el.css("position")&&n.el.css("position","relative"),n.cssPosition=n.el.css("position");var i={container:n.settings.container,not:".clayfy-handler",escape:!1,droppable:n.settings.droppable};i=$.extend(!0,{},n.settings,i),n.settings.move&&"relative"!==n.cssPosition||(i.move=!1),n.draggable=new e(n.el,i);for(var r=0;r<t.length;r++){var a=t[r].split(" "),s=!0;for(var l in a)n.settings.hasOwnProperty(a[l])&&n.settings[a[l]]||(s=!1);s&&n.handlers.push(new o(t[r],n))}n.touchableDevice&&n.el.addClass("clayfy-touch-device")};this.getSize=function(){n.parent=n.el.offsetParent();var e=n.parent,t=n.el.position();return{width:n.el.width(),height:n.el.height(),left:t.left+e.scrollLeft(),top:t.top+e.scrollTop(),outerWidth:n.el.outerWidth(),outerHeight:n.el.outerHeight()}},this.getNewSize=function(){var e=n.el.outerHeight(),t=n.el.outerWidth(),i=n.el.position(),o=i.left+n.parent.scrollLeft(),r=i.top+n.parent.scrollTop();return{outerWidth:t,outerHeight:e,top:r,left:o,right:o+t,bottom:r+e,width:n.el.width(),height:n.el.height()}},this.resize={left:function(){n.el.width(n.actualSize.width-$.clayfy.dX),"relative"!==n.cssPosition&&n.el.css({left:n.actualSize.left+$.clayfy.dX})},top:function(){n.el.height(n.actualSize.height-$.clayfy.dY),"relative"!==n.cssPosition&&n.el.css({top:n.actualSize.top+$.clayfy.dY})},bottom:function(){n.el.height(n.actualSize.height+$.clayfy.dY)},right:function(){n.el.width(n.actualSize.width+$.clayfy.dX)}},this.hideHandlers=function(){"ready"===n.status&&($.each(n.handlers,function(e,t){t.el.css("display","none")}),s=!1)},this.showHandlers=function(){s||"ready"!==n.status&&!n.touchableDevice||($.each(n.handlers,function(e,t){t.el.css("display","block")}),s=!0,n.updateHandlersPosition())},this.updateHandlersPosition=function(){n.newSize=n.getNewSize(),$.each(n.handlers,function(e,t){t.updatePosition()})},this.cancel=function(){console.log("cancelled"),n.status="ready",n.hideHandlers(),n.status="canceling",$("body").trigger("mouseup");var e="relative"!==n.cssPosition?n.initSize:{width:n.initSize.width,height:n.initSize.height};n.el.animate(e,100,function(){n.status="ready",n.el.is(":hover")&&n.showHandlers(),n.el.trigger("clayfy-cancel")})},function(){n.touchableDevice=isTouchDevice(),n.originalSize=n.getSize(),n.actualSize=n.originalSize,n.newSize=n.getNewSize(),d(),n.preserveAspectRatio=n.settings.preserveAspectRatio,n.el.on("clayfy-resizestart",function(e){n.initSize=n.getNewSize(),$(window).on("keydown",l),n.status="resizing"}),n.el.on("clayfy-resizeend",function(){$(window).off("keydown",l),n.status="ready"}),n.el.on("clayfy-dragstart",function(e){e.stopPropagation(),n.initSize=n.getSize(),n.status="dragging"}),n.el.on("clayfy-drop",function(e){e.stopPropagation(),n.status="ready"}),n.el.on("clayfy-resize clayfy-drag",n.updateHandlersPosition),$(window).on("resize",n.updateHandlersPosition),n.el.on("clayfy-dragstart",function(e){e.stopPropagation(),$(window).on("keydown",l)}),n.el.on("clayfy-drop",function(e){e.stopPropagation(),$(window).off("keydown",l)});var e=n.el;$.each(n.handlers,function(t,i){n.hideHandlers(),e=e.add(i.el)}),e.on("mouseover",function(){a&&clearTimeout(a),n.showHandlers()}),e.on("mouseout",function(){a=setTimeout(n.hideHandlers,20)}),n.el.on("clayfy-resizeend clayfy-drop",function(e){e.stopPropagation(),n.el.parent().find(":hover").length||n.touchableDevice||(s=!1,n.el.trigger("mouseout"))}),n.touchableDevice&&(e.on("touchstart",function(){a&&clearTimeout(a),n.showHandlers(),a=setTimeout(n.hideHandlers,4e3)}),n.el.on("clayfy-resizeend clayfy-drop",function(){n.el.trigger("click")}))}()}function o(t,i){this.el=$("<div>",{class:"clayfy-handler clayfy-"+t,style:"position: absolute"}),this.resizable=i,this.position=t,this.draggable;var o=this,r=!1;this.updatePosition=function(){var e=i.newSize;switch(o.position){case"left":o.el.css({width:5,left:e.left,top:e.top,height:e.outerHeight});break;case"right":o.el.css({width:5,left:e.right-5,top:e.top,height:e.outerHeight});break;case"top":o.el.css({height:5,left:e.left,top:e.top,width:e.outerWidth});break;case"bottom":o.el.css({height:5,left:e.left,top:e.bottom-5,width:e.outerWidth});break;case"top left":o.el.css({width:8,height:8,left:e.left,top:e.top});break;case"top right":o.el.css({width:8,height:8,left:e.right-8,top:e.top});break;case"bottom left":o.el.css({width:8,height:8,left:e.left,top:e.bottom-8});break;case"bottom right":o.resizable.touchableDevice?o.el.css({width:18,height:18,left:e.right-20,top:e.bottom-20}):o.el.css({width:8,height:8,left:e.right-8,top:e.bottom-8})}},this.setBounderies=function(e){var t,i,r,a,n=e||[1e5,1e5,1e5,1e5],s=[];o.resizable.actualSize=o.resizable.getSize(),t=o.resizable.actualSize,i=o.resizable.settings,r=o.resizable.originalSize.width/o.resizable.originalSize.height,(a=o.draggable.getContainerBounderies())||(a={top:1e13,right:1e13,bottom:1e13,left:1e13});for(var l=0,d=i.maxSize.length;l<d;l++)null===i.maxSize[l]&&(i.maxSize[l]=1e13);$.clayfy.getInner(o.draggable.el);"left"!==o.position&&"top"!==o.position&&"top left"!==o.position||(n[1]=t.outerWidth-i.minSize[0],n[3]=i.maxSize[0]-t.outerWidth,n[2]=t.outerHeight-i.minSize[1],n[0]=i.maxSize[1]-t.outerHeight,o.draggable.settings.bounderies=n,s[3]=Math.min(a.left,n[3],a.top*r,n[0]*r),s[0]=Math.min(a.top,n[0],a.left/r,n[3]/r),s[1]=Math.min(a.right,n[1],a.bottom*r+n[2],n[2]*r),s[2]=Math.min(a.bottom,n[2],a.right/r+n[1],n[1]/r)),"right"!==o.position&&"bottom"!==o.position&&"bottom right"!==o.position||(n[3]=t.outerWidth-i.minSize[0],n[1]=i.maxSize[0]-t.outerWidth,n[0]=t.outerHeight-i.minSize[1],n[2]=i.maxSize[1]-t.outerHeight,o.draggable.settings.bounderies=n,s[1]=Math.min(a.right,n[1],a.bottom*r,n[2]*r),s[2]=Math.min(a.bottom,n[2],a.right/r,n[1]/r),s[3]=Math.min(a.left,n[3],a.top*r+n[0],n[0]*r),s[0]=Math.min(a.top,n[0],a.left/r+n[3],n[3]/r)),"bottom left"===o.position&&(n[0]=t.outerHeight-i.minSize[1],n[1]=t.outerWidth-i.minSize[0],n[2]=i.maxSize[1]-t.outerHeight,n[3]=i.maxSize[0]-t.outerWidth,o.draggable.settings.bounderies=n,s[3]=parseInt(Math.min(a.left,n[3],a.bottom*r,n[2]*r)),s[2]=parseInt(Math.min(a.bottom,n[2],a.left/r,n[3]/r)),s[0]=parseInt(Math.min(a.top,n[0],a.right/r+n[1],n[1]/r)),s[1]=parseInt(Math.min(a.right,n[1],a.top*r+n[0],n[0]*r))),"top right"===o.position&&(n[0]=i.maxSize[1]-t.outerHeight,n[1]=i.maxSize[0]-t.outerWidth,n[2]=t.outerHeight-i.minSize[1],n[3]=t.outerWidth-i.minSize[0],o.draggable.settings.bounderies=n,s[0]=parseInt(Math.min(a.top,n[0],a.right/r,n[1]/r)),s[1]=parseInt(Math.min(a.right,n[1],a.top*r,n[0]*r)),s[3]=parseInt(Math.min(a.left,n[3],a.bottom*r+n[2],n[2]*r)),s[2]=parseInt(Math.min(a.bottom,n[2],a.left/r+n[3],n[3]/r))),o.originalBounderies={top:-n[0],right:n[1],bottom:n[2],left:-n[3]},o.aspectRatioBounderies={top:-s[0],right:s[1],bottom:s[2],left:-s[3]},o.draggable.bounderies=o.resizable.preserveAspectRatio?o.aspectRatioBounderies:o.originalBounderies},this.fixDeltas=function(){var e=$.clayfy;if(o.resizable.preserveAspectRatio)t=o.resizable.originalSize.width/o.resizable.originalSize.height;if(!o.resizable.preserveAspectRatio&&o.resizable.shiftKey)var t=o.resizable.actualSize.width/o.resizable.actualSize.height;(o.resizable.preserveAspectRatio||o.resizable.shiftKey)&&("right"===o.position&&(e.dY=e.dX/t),"bottom"===o.position&&(e.dX=e.dY*t),"left"===o.position&&(e.dY=e.dX/t),"top"===o.position&&(e.dX=e.dY*t),"top left"===o.position&&(e.dY=e.dX/t),"top right"===o.position&&(e.dY=-e.dX/t),"bottom left"===o.position&&(e.dY=-e.dX/t),"bottom right"===o.position&&(e.dY=e.dX/t))},function(){i.settings.className&&o.el.addClass(i.settings.className),o.updatePosition(),o.resizable.el.after(o.el),o.draggable=new e(o.el,{move:!1,container:i.draggable.container,scroll:!1,escape:!1}),o.draggable.el.on("clayfy-drop",function(e){i.el.trigger("clayfy-resizeend"),i.settings.callbacks.resizeend()}),o.draggable.el.on("clayfy-dragstart",function(e){e.stopPropagation(),o.resizable.preserveAspectRatio||(o.resizable.originalSize=o.resizable.getSize()),i.el.trigger("clayfy-beforeresize"),o.setBounderies(),i.el.trigger("clayfy-resizestart"),i.settings.callbacks.resizestart(),r=!1}),o.draggable.el.on("clayfy-drag",function(e){e.shiftKey&&!i.preserveAspectRatio&&(i.shiftKey=!0),e.shiftKey||(i.shiftKey=!1),!r||e.shiftKey||i.preserveAspectRatio||(console.log("Desactivate: preserve aspect ratio"),o.draggable.bounderies=o.originalBounderies,r=!1),r||!e.shiftKey||i.preserveAspectRatio||(console.log("Activate: preserve aspect ratio"),o.draggable.bounderies=o.aspectRatioBounderies,r=!0),i.preserveAspectRatio&&!i.shiftKey&&(o.draggable.bounderies=o.aspectRatioBounderies)}),t.indexOf("left")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"left"===t&&i.resize.top()),i.resize.left()}),t.indexOf("top")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"top"===t&&i.resize.left()),i.resize.top()}),t.indexOf("right")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"right"===t&&i.resize.bottom()),i.resize.right()}),t.indexOf("bottom")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"bottom"===t&&i.resize.right()),i.resize.bottom()}),o.draggable.el.on("clayfy-drag",function(e){i.el.trigger("clayfy-resize"),i.settings.callbacks.resize()}),o.resizable.touchableDevice&&o.el.addClass("clayfy-touch-device")}()}function r(t,i){this.el=t instanceof $?t:$(t),this.draggableBox,this.dropArea=$("<div>",{class:"clayfy-sort-droparea"}),this.draggable,this.droppable,this.droppableParent,this.index,this.indexRelative,this.parent,this.settings=$.extend(!0,{},$.clayfy.settings,i);var o,r=this,a=function(e){27===e.keyCode&&r.cancel()},n=function(){r.draggableBox=r.el.clone(),r.draggableBox.css({position:"absolute",width:"100%",height:"100%"}).addClass("clayfy-sort-dragging");var e=r.el.parent();"static"===e.css("position")&&e.css("position","relative")},s=function(){f(),c(),r.index=r.droppable.index(r.el),r.parent=r.el.parent(),r.indexRelative=r.parent.find(r.droppable).index(r.el),r.draggableBox.css({width:r.el.outerWidth(),height:r.el.outerHeight(),top:r.el.position().top,left:r.el.position().left}),l(),r.draggableBox.appendTo(r.parent),r.el.css({visibility:"hidden"})},l=function(){r.dropArea.appendTo(r.el.parent()),r.dropArea.css({position:"absolute",width:r.el.outerWidth(),height:r.el.outerHeight(),top:r.el.position().top+parseInt(r.el.css("margin-top"))-parseInt(r.dropArea.css("border-top-width")),left:r.el.position().left+parseInt(r.el.css("margin-left"))-parseInt(r.dropArea.css("border-left-width"))})},d=function(e){var t=r.parent.find(r.droppable);if(r.parent.is($(r.droppedTarget).parent())){var i=t.index(r.el);r.indexRelative<i?t.eq(r.indexRelative).before(r.el):t.eq(r.indexRelative).after(r.el)}else t.length?t.eq(r.indexRelative).before(r.el):r.parent.append(r.el);l()},g=function(e){f(),(!1===r.el.triggerHandler("validateChange")||!r.parent.is($(r.droppedTarget).parent())&&!r.settings.export||o)&&d();var t=r.dropArea.parent().offset(),i=r.draggableBox.parent().offset(),a=r.el.position().left+(t.left-i.left),n=r.el.position().top+(t.top-i.top);return r.draggableBox.animate({top:n,left:a},200,function(){r.dropArea.detach(),r.el[0].style.visibility="",r.draggableBox.detach(),f();var e=r.droppable.index(r.el);e!=r.index&&(r.index=e,r.el.trigger($.Event("clayfy-changeorder",{index:r.index,order:r.droppable}))),r.el.parent().find(".clayfy-sort-helper").remove()}),o=!1,!1},p=function(e){if(!r.el.is(e.target)){f();var t=r.droppable.index(e.target),i=r.droppable.index(r.el);r.droppedTarget=e.target,t>i?$(e.target).after(r.el):$(e.target).before(r.el),l(),r.draggable.updateDropArea(),r.parent.find(r.droppable).length<2?r.parent.find(".clayfy-sort-helper").length||r.parent.append('<div class="clayfy-sort-helper" style="position: absolute; width: 100%; height: 100%; top: 0; left:0"></div>'):r.parent.find(".clayfy-sort-helper").remove(),$(".clayfy-sort-helper").each(function(){var e=$(this);e.parent().is(r.droppableParent)&&r.draggable.addDroppable(e)})}},f=function(){r.settings.siblings?r.droppable=r.settings.siblings instanceof $?r.settings.siblings:$(r.settings.siblings):r.droppable=r.el.siblings().andSelf()},c=function(){r.droppableParent||(r.droppableParent=r.el.parent()),r.droppable.each(function(){r.droppableParent=r.droppableParent.add($(this).parent())})};this.cancel=function(){o=!0,$("body").trigger("mouseup")},function(){f(),c(),n(),r.el.on("mousedown touchstart",function(e){"mousedown"===e.type&&1!==e.which||(s(),r.draggableBox.trigger($.Event(e.type,e)))});var t=$.extend(!0,{},r.settings,{droppable:r.droppable,escape:!1,dropoutside:!0});r.draggable=new e(r.draggableBox,t),r.draggableBox.on("clayfy-drop",g),r.draggableBox.on("clayfy-dropoutside",function(e){return!1}),r.draggableBox.on("clayfy-dragenter",p),r.draggableBox.on("clayfy-dragstart",function(){r.draggable.resetDroppable(r.droppable),$(".clayfy-sort-helper").each(function(){var e=$(this);e.parent().is(r.droppableParent)&&r.draggable.addDroppable(e)})}),r.draggableBox.on("clayfy-dragstart",function(e){e.stopPropagation(),$(window).on("keydown",a)}),r.draggableBox.on("clayfy-drop",function(){$(window).off("keydown",a)})}()}$.clayfy={dX:0,dY:0,container:function(e,i){return new t(e,i)},settings:{type:"draggable",bounderies:[1e7,1e7,1e7,1e7],container:"",moveX:!0,moveY:!0,move:!0,not:"",ghost:!1,coverScreen:!0,scrollable:"",droppable:"",fit:!0,dropoutside:!1,migrate:!1,overflow:!1,escape:!0,propagate:!0,preserveAspectRatio:!1,maxSize:[500,200],minSize:[100,50],left:!0,top:!0,right:!0,bottom:!0,className:"",siblings:"",export:!0,dragstart:function(e){},drag:function(e){},drop:function(e){}},getInner:function(e){var t,i,o,r,a,n=e instanceof $?e:$(e);return n.length?(t=n[0].style.position,"static"===n.css("position")&&n.css({position:"relative"}),o=$("<div>",{style:"position:absolute;top:0;left:0;bottom:0;right:0"}),i=$("<div>",{style:"position:absolute;top:0;left:0;width:100%;height:100%"}),o.append(i),n.append(o),r=i.width(),a=i.height(),o.remove(),n[0].style.position=t,{innerWidth:r,innerHeight:a}):{width:0,height:0}}};var a;$.fn.clayfy=function(t){var o=arguments;if(void 0===t||"object"==typeof t){var n=$.clayfy.settings.type;switch(void 0!==t&&void 0!==t.type&&(n=t.type),n){case"draggable":a=e;break;case"resizable":a=i;break;case"sortable":a=r}return this.each(function(){$.data(this,"clayfy")||$.data(this,"clayfy",new a(this,t))})}if("string"==typeof t&&"_"!==t[0]&&"init"!==t){if("instance"===t)return this.length?$.data(this[0],"clayfy"):null;if(0==Array.prototype.slice.call(o,1).length&&-1!=$.inArray(t,$.fn.clayfy.getters)){var s=$.data(this[0],"clayfy");return s[t].apply(s,Array.prototype.slice.call(o,1))}return this.each(function(){var e=$.data(this,"clayfy");"function"==typeof e[t]&&e[t].apply(e,Array.prototype.slice.call(o,1))})}},$.fn.clayfy.getters=["getPosition"]}(jQuery);
isTouchDevice=function(){return"ontouchstart"in window||navigator.maxTouchPoints};

!function(a,u){a.guessLanguage=(a.module||{}).exports=new function(){var e=a._languageData||{};"object"==typeof module&&module.exports===a&&(e=require("./_languageData")||{});var n=20,i=300,t={ab:"Abkhazian",af:"Afrikaans",ar:"Arabic",az:"Azeri",be:"Belarusian",bg:"Bulgarian",bn:"Bengali",bo:"Tibetan",br:"Breton",ca:"Catalan",ceb:"Cebuano",cs:"Czech",cy:"Welsh",da:"Danish",de:"German",el:"Greek",en:"English",eo:"Esperanto",es:"Spanish",et:"Estonian",eu:"Basque",fa:"Farsi",fi:"Finnish",fo:"Faroese",fr:"French",fy:"Frisian",gd:"Scots Gaelic",gl:"Galician",gu:"Gujarati",ha:"Hausa",haw:"Hawaiian",he:"Hebrew",hi:"Hindi",hmn:"Pahawh Hmong",hr:"Croatian",hu:"Hungarian",hy:"Armenian",id:"Indonesian",is:"Icelandic",it:"Italian",ja:"Japanese",ka:"Georgian",kk:"Kazakh",km:"Cambodian",ko:"Korean",ku:"Kurdish",ky:"Kyrgyz",la:"Latin",lt:"Lithuanian",lv:"Latvian",mg:"Malagasy",mk:"Macedonian",ml:"Malayalam",mn:"Mongolian",mr:"Marathi",ms:"Malay",nd:"Ndebele",ne:"Nepali",nl:"Dutch",nn:"Nynorsk",no:"Norwegian",nso:"Sepedi",pa:"Punjabi",pl:"Polish",ps:"Pashto",pt:"Portuguese","pt-PT":"Portuguese (Portugal)","pt-BR":"Portuguese (Brazil)",ro:"Romanian",ru:"Russian",sa:"Sanskrit",bs:"Serbo-Croatian",sk:"Slovak",sl:"Slovene",so:"Somali",sq:"Albanian",sr:"Serbian",sv:"Swedish",sw:"Swahili",ta:"Tamil",te:"Telugu",th:"Thai",tl:"Tagalog",tlh:"Klingon",tn:"Setswana",tr:"Turkish",ts:"Tsonga",tw:"Twi",uk:"Ukrainian",ur:"Urdu",uz:"Uzbek",ve:"Venda",vi:"Vietnamese",xh:"Xhosa",zh:"Chinese","zh-TW":"Traditional Chinese (Taiwan)",zu:"Zulu"},r={ab:12026,af:40,ar:26020,az:26030,be:11890,bg:26050,bn:26040,bo:26601,br:1361,ca:3,ceb:26060,cs:26080,cy:26560,da:26090,de:26160,el:26165,en:26110,eo:11933,es:26460,et:26120,eu:1232,fa:26130,fi:26140,fo:11817,fr:26150,fy:1353,gd:65555,gl:1252,gu:26599,ha:26170,haw:26180,he:26592,hi:26190,hr:26070,hu:26200,hy:26597,id:26220,is:26210,it:26230,ja:26235,ka:26600,kk:26240,km:1222,ko:26255,ku:11815,ky:26260,la:26280,lt:26300,lv:26290,mg:1362,mk:26310,ml:26598,mn:26320,mr:1201,ms:1147,ne:26330,nl:26100,nn:172,no:26340,pa:65550,pl:26380,ps:26350,pt:26390,ro:26400,ru:26410,sa:1500,bs:1399,sk:26430,sl:26440,so:26450,sq:26010,sr:26420,sv:26480,sw:26470,ta:26595,te:26596,th:26594,tl:26490,tlh:26250,tn:65578,tr:26500,tw:1499,uk:26520,ur:26530,uz:26540,vi:26550,zh:26065,"zh-TW":22},F=[["Armenian","hy"],["Hebrew","he"],["Bengali","bn"],["Gurmukhi","pa"],["Greek","el"],["Gujarati","gu"],["Oriya","or"],["Tamil","ta"],["Telugu","te"],["Kannada","kn"],["Malayalam","ml"],["Sinhala","si"],["Thai","th"],["Lao","lo"],["Tibetan","bo"],["Burmese","my"],["Georgian","ka"],["Mongolian","mn"],["Khmer","km"],["Pahawh Hmong","hmn"]],o="unknown",g=["cs","af","pl","hr","ro","sk","sl","tr","hu","az","et","sq","ca","es","fr","de","nl","it","da","is","no","sv","fi","lv","pt","ve","lt","tl","cy","vi"],l=["en","ceb","ha","so","tlh","id","haw","la","sw","eu","nr","nso","zu","xh","ss","st","tn","ts"].concat(g),s=["ru","uk","kk","uz","mn","sr","mk","bg","ky"],h=["ar","fa","ps","ur"],c=["hi","ne"],p=["pt-BR","pt-PT"],m={"Basic Latin":/[\u0000-\u007F]/g,"Latin-1 Supplement":/[\u0080-\u00FF]/g,"Latin Extended-A":/[\u0100-\u017F]/g,"Latin Extended-B":/[\u0180-\u024F]/g,"IPA Extensions":/[\u0250-\u02AF]/g,"Spacing Modifier Letters":/[\u02B0-\u02FF]/g,"Combining Diacritical Marks":/[\u0300-\u036F]/g,"Greek and Coptic":/[\u0370-\u03FF]/g,Cyrillic:/[\u0400-\u04FF]/g,"Cyrillic Supplement":/[\u0500-\u052F]/g,Armenian:/[\u0530-\u058F]/g,Hebrew:/[\u0590-\u05FF]/g,Arabic:/[\u0600-\u06FF]/g,Syriac:/[\u0700-\u074F]/g,"Arabic Supplement":/[\u0750-\u077F]/g,Thaana:/[\u0780-\u07BF]/g,NKo:/[\u07C0-\u07FF]/g,Devanagari:/[\u0900-\u097F]/g,Bengali:/[\u0980-\u09FF]/g,Gurmukhi:/[\u0A00-\u0A7F]/g,Gujarati:/[\u0A80-\u0AFF]/g,Oriya:/[\u0B00-\u0B7F]/g,Tamil:/[\u0B80-\u0BFF]/g,Telugu:/[\u0C00-\u0C7F]/g,Kannada:/[\u0C80-\u0CFF]/g,Malayalam:/[\u0D00-\u0D7F]/g,Sinhala:/[\u0D80-\u0DFF]/g,Thai:/[\u0E00-\u0E7F]/g,Lao:/[\u0E80-\u0EFF]/g,Tibetan:/[\u0F00-\u0FFF]/g,Burmese:/[\u1000-\u109F]/g,Georgian:/[\u10A0-\u10FF]/g,"Hangul Jamo":/[\u1100-\u11FF]/g,Ethiopic:/[\u1200-\u137F]/g,"Ethiopic Supplement":/[\u1380-\u139F]/g,Cherokee:/[\u13A0-\u13FF]/g,"Unified Canadian Aboriginal Syllabics":/[\u1400-\u167F]/g,Ogham:/[\u1680-\u169F]/g,Runic:/[\u16A0-\u16FF]/g,"Pahawh Hmong":/[\u16B0-\u16B8]/g,Tagalog:/[\u1700-\u171F]/g,Hanunoo:/[\u1720-\u173F]/g,Buhid:/[\u1740-\u175F]/g,Tagbanwa:/[\u1760-\u177F]/g,Khmer:/[\u1780-\u17FF]/g,Mongolian:/[\u1800-\u18AF]/g,Limbu:/[\u1900-\u194F]/g,"Tai Le":/[\u1950-\u197F]/g,"New Tai Lue":/[\u1980-\u19DF]/g,"Khmer Symbols":/[\u19E0-\u19FF]/g,Buginese:/[\u1A00-\u1A1F]/g,Balinese:/[\u1B00-\u1B7F]/g,"Phonetic Extensions":/[\u1D00-\u1D7F]/g,"Phonetic Extensions Supplement":/[\u1D80-\u1DBF]/g,"Combining Diacritical Marks Supplement":/[\u1DC0-\u1DFF]/g,"Latin Extended Additional":/[\u1E00-\u1EFF]/g,"Greek Extended":/[\u1F00-\u1FFF]/g,"General Punctuation":/[\u2000-\u206F]/g,"Superscripts and Subscripts":/[\u2070-\u209F]/g,"Currency Symbols":/[\u20A0-\u20CF]/g,"Combining Diacritical Marks for Symbols":/[\u20D0-\u20FF]/g,"Letterlike Symbols":/[\u2100-\u214F]/g,"Number Forms":/[\u2150-\u218F]/g,Arrows:/[\u2190-\u21FF]/g,"Mathematical Operators":/[\u2200-\u22FF]/g,"Miscellaneous Technical":/[\u2300-\u23FF]/g,"Control Pictures":/[\u2400-\u243F]/g,"Optical Character Recognition":/[\u2440-\u245F]/g,"Enclosed Alphanumerics":/[\u2460-\u24FF]/g,"Box Drawing":/[\u2500-\u257F]/g,"Block Elements":/[\u2580-\u259F]/g,"Geometric Shapes":/[\u25A0-\u25FF]/g,"Miscellaneous Symbols":/[\u2600-\u26FF]/g,Dingbats:/[\u2700-\u27BF]/g,"Miscellaneous Mathematical Symbols-A":/[\u27C0-\u27EF]/g,"Supplemental Arrows-A":/[\u27F0-\u27FF]/g,"Braille Patterns":/[\u2800-\u28FF]/g,"Supplemental Arrows-B":/[\u2900-\u297F]/g,"Miscellaneous Mathematical Symbols-B":/[\u2980-\u29FF]/g,"Supplemental Mathematical Operators":/[\u2A00-\u2AFF]/g,"Miscellaneous Symbols and Arrows":/[\u2B00-\u2BFF]/g,Glagolitic:/[\u2C00-\u2C5F]/g,"Latin Extended-C":/[\u2C60-\u2C7F]/g,Coptic:/[\u2C80-\u2CFF]/g,"Georgian Supplement":/[\u2D00-\u2D2F]/g,Tifinagh:/[\u2D30-\u2D7F]/g,"Ethiopic Extended":/[\u2D80-\u2DDF]/g,"Supplemental Punctuation":/[\u2E00-\u2E7F]/g,"CJK Radicals Supplement":/[\u2E80-\u2EFF]/g,"KangXi Radicals":/[\u2F00-\u2FDF]/g,"Ideographic Description Characters":/[\u2FF0-\u2FFF]/g,"CJK Symbols and Punctuation":/[\u3000-\u303F]/g,Hiragana:/[\u3040-\u309F]/g,Katakana:/[\u30A0-\u30FF]/g,Bopomofo:/[\u3100-\u312F]/g,"Hangul Compatibility Jamo":/[\u3130-\u318F]/g,Kanbun:/[\u3190-\u319F]/g,"Bopomofo Extended":/[\u31A0-\u31BF]/g,"CJK Strokes":/[\u31C0-\u31EF]/g,"Katakana Phonetic Extensions":/[\u31F0-\u31FF]/g,"Enclosed CJK Letters and Months":/[\u3200-\u32FF]/g,"CJK Compatibility":/[\u3300-\u33FF]/g,"CJK Unified Ideographs Extension A":/[\u3400-\u4DBF]/g,"Yijing Hexagram Symbols":/[\u4DC0-\u4DFF]/g,"CJK Unified Ideographs":/[\u4E00-\u9FFF]/g,"Yi Syllables":/[\uA000-\uA48F]/g,"Yi Radicals":/[\uA490-\uA4CF]/g,"Modifier Tone Letters":/[\uA700-\uA71F]/g,"Latin Extended-D":/[\uA720-\uA7FF]/g,"Syloti Nagri":/[\uA800-\uA82F]/g,"Phags-pa":/[\uA840-\uA87F]/g,"Hangul Syllables":/[\uAC00-\uD7AF]/g,"High Surrogates":/[\uD800-\uDB7F]/g,"High Private Use Surrogates":/[\uDB80-\uDBFF]/g,"Low Surrogates":/[\uDC00-\uDFFF]/g,"Private Use Area":/[\uE000-\uF8FF]/g,"CJK Compatibility Ideographs":/[\uF900-\uFAFF]/g,"Alphabetic Presentation Forms":/[\uFB00-\uFB4F]/g,"Arabic Presentation Forms-A":/[\uFB50-\uFDFF]/g,"Variation Selectors":/[\uFE00-\uFE0F]/g,"Vertical Forms":/[\uFE10-\uFE1F]/g,"Combining Half Marks":/[\uFE20-\uFE2F]/g,"CJK Compatibility Forms":/[\uFE30-\uFE4F]/g,"Small Form Variants":/[\uFE50-\uFE6F]/g,"Arabic Presentation Forms-B":/[\uFE70-\uFEFF]/g,"Halfwidth and Fullwidth Forms":/[\uFF00-\uFFEF]/g,Specials:/[\uFFF0-\uFFFF]/g};function d(a,e){var n=function(a){var u={};for(var e in m){var n=a.match(m[e]),i=(n?n.length:0)/a.length;u[e]=i}return u}(a);if(n["Hangul Syllables"]+n["Hangul Jamo"]+n["Hangul Compatibility Jamo"]>=.4)e.apply(u,["ko"]);else if(n["Greek and Coptic"]>=.4)e.apply(u,["el"]);else if(n.Hiragana+n.Katakana+n["Katakana Phonetic Extensions"]>=.2)e.apply(u,["ja"]);else if(n["CJK Unified Ideographs"]+n.Bopomofo+n["Bopomofo Extended"]+n["KangXi Radicals"]>=.4)e.apply(u,["zh"]);else if(n.Cyrillic>=.4)b(a,s,e);else if(n.Arabic+n["Arabic Presentation Forms-A"]+n["Arabic Presentation Forms-B"]>=.4)b(a,h,e);else if(n.Devanagari>=.4)b(a,c,e);else{for(var i=0,t=F.length;i<t;i++)if(n[F[i][0]]>=.4)return void e.apply(u,[F[i][1]]);n["Latin-1 Supplement"]+n["Latin Extended-A"]+n["IPA Extensions"]>=.4?b(a,g,function(n){"pt"==n?b(a,p,e):e.apply(u,[n])}):n["Basic Latin"]>=.15?b(a,l,e):e.apply(u,[o])}}function b(a,e,i){if(a.length<n)i.apply(u,[o]);else{for(var t={},r=function(a){for(var u={},e=[],n=(a=a.toLowerCase()).split(""),i=0,t=n.length-2;i<t;i++){var r=n[i]+n[i+1]+n[i+2]+"";u[r]?u[r]+=1:u[r]=1}for(var i in u)e[e.length]=[i,u[i]];return e.sort(function(a,u){return u[1]-a[1]})}(a),F=0,g=e.length;F<g;F++){var l=e[F].toLowerCase(),s=y(l)||null;s&&(t[l]=A(r,s))}var h=[];for(var c in t)h.push([c,t[c]]);if(0!=h.length){var p=h.sort(function(a,u){return a[1]-u[1]});i.apply(u,[p[0][0]])}else i.apply(u,[o])}}var f={};function y(a){if(f[a])return f[a];var u=e[a];if(!u)return{};for(var n=u.match(/([\s\S]{1,3})/g),i={},t=0,r=n.length;t<r;t++)i[n[t]]=t;return f[a]=i,i}function A(a,u){for(var e=0,n=0,t=a.length;n<t;n++)u[a[n][0]]?e+=Math.abs(a[n][1]-u[a[n][0]]):e+=i;return e}return{detect:function(a,e){a?d(a=a.substr(0,4096).replace(/[\u0021-\u0040]/g,""),e):e.apply(u,[o])},info:function(a,e){this.detect(a,function(a){a!==o?e.apply(u,[[a,r[a],t[a]]]):e.apply(u,[[o,o,o]])})},code:function(a,e){this.detect(a,function(a){a!==o?e.apply(u,[r[a]]):e.apply(u,[-1])})},name:function(a,e){this.detect(a,function(a){a!==o?e.apply(u,[t[a]]):e.apply(u,[o])})}}}}(this);
!function(t,e,i,s){t.widget("ui.triggeredAutocomplete",t.extend(!0,{},t.ui.autocomplete.prototype,{options:{trigger:"@",allowDuplicates:!1},_create:function(){var e=this;this.id_map=new Object,this.stopIndex=-1,this.stopLength=-1,this.contents="",this.cursorPos=0,this.element.bind("keydown.autocomplete.fix",function(i){switch(i.keyCode){case t.ui.keyCode.ESCAPE:e.close(i),i.stopImmediatePropagation();break;case t.ui.keyCode.UP:case t.ui.keyCode.DOWN:e.menu.element.is(":visible")||i.stopImmediatePropagation()}});var i=this.element.attr("id_map");i&&(this.id_map=jQuery.parseJSON(i)),this.ac=t.ui.autocomplete.prototype,this.ac._create.apply(this,arguments),this.updateHidden(),this.options.select=function(t,i){var s=e.contents,n=e.cursorPos,o=s.substring(n,s.length),r=s.substring(0,n);r=r.substring(0,r.lastIndexOf(e.options.trigger));var a=e.element.scrollTop();this.value=r+e.options.trigger+i.item.username+" "+o,e.element.scrollTop(a),e.id_map[i.item.label]=i.item.value,e.updateHidden();var l=r.length+e.options.trigger.length+i.item.username.length+2;if(this.createTextRange){var u=this.createTextRange();u.move("character",l),u.select()}else this.setSelectionRange&&this.setSelectionRange(l,l);return!1},this.options.focus=function(t,e){return!1},this.menu.options.blur=function(t,e){return!1},this.element.focus(function(){e.updateHidden()}),this.element.change(function(){e.updateHidden()})},_renderItem:function(e,i){return void 0!=i.img?t("<li></li>").data("item.autocomplete",i).append("<a><img src='"+i.img+"' /><span>"+i.label+" <span class='small-mention'>@"+i.username+"</span></span></a>").appendTo(e):t("<li></li>").data("item.autocomplete",i).append(t("<a></a>").text(i.label)).appendTo(e)},_move:function(t,e){this.menu.element.is(":visible")?this.menu.first()&&/^previous/.test(t)||this.menu.last()&&/^next/.test(t)?this.menu.deactivate():this.menu[t](e):this.search(null,e)},search:function(t,e){var i=this.element.val(),s=this.getCursor();this.contents=i,this.cursorPos=s;i.substring(i.lastIndexOf(this.options.trigger)-1,s),new RegExp("\\B\\"+this.options.trigger+"([\\w\\-]+)");if(i.indexOf(this.options.trigger)>=0){var n=(i=i.substring(0,s)).substring(i.lastIndexOf(this.options.trigger)+1,i.length);if(this.stopIndex==i.lastIndexOf(this.options.trigger)&&n.length>this.stopLength&&(n=""),n.length>0)return this.updateHidden(),this._search(n);this.close()}},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(i){null!=i?(n(t.map(i,function(t){if(label="string"==typeof t?t:t.label,!s.id_map[label]||s.options.allowDuplicates)return t})),s.stopLength=-1,s.stopIndex=-1):(s.stopLength=e.term.length,s.stopIndex=s.contents.lastIndexOf(s.options.trigger),s.close())}})}):this.source=this.options.source},destroy:function(){t.Widget.prototype.destroy.call(this)},getCursor:function(){var t=this.element[0];if(t.selectionStart)return t.selectionStart;if(t.ownerDocument.selection){var e=t.ownerDocument.selection.createRange();if(!e)return 0;var i=t.createTextRange(),s=i.duplicate();return i.moveToBookmark(e.getBookmark()),s.setEndPoint("EndToStart",i),s.text.length}},updateHidden:function(){var e=this.options.trigger,i=this.element.scrollTop(),s=this.element.val();for(var n in this.id_map){var o=e+n;o=o.replace(/[^a-zA-Z 0-9@]+/g,"\\$&");var r=new RegExp(o,"g");s==(s=s.replace(r,e+"["+this.id_map[n]+"]"))&&delete this.id_map[n]}t(this.options.hidden).val(s),this.element.scrollTop(i)}}))}(jQuery,window,document);

!function($){$.fn.extend({limit:function(limit,element){var interval,f,self=$(this);$(this).focus(function(){interval=window.setInterval(substring,100)}),$(this).blur(function(){clearInterval(interval),substring()}),substringFunction="function substring(){ var val = $(self).val();var length = val.length;if(length > limit){$(self).val($(self).val().substring(0,limit));}",void 0!==element&&(substringFunction+="if($(element).html() != limit-length){$(element).html((limit-length<=0)?'0':limit-length);}"),substringFunction+="}",eval(substringFunction),substring()}})}(jQuery);

/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

/*!
  * Bootstrap v4.5.3 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap={},t.jQuery)}(this,(function(t,e){"use strict";function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var i=n(e);function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function s(t){var e=this,n=!1;return i.default(this).one(l.TRANSITION_END,(function(){n=!0})),setTimeout((function(){n||l.triggerTransitionEnd(e)}),t),this}var l={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");if(!e||"#"===e){var n=t.getAttribute("href");e=n&&"#"!==n?n.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var e=i.default(t).css("transition-duration"),n=i.default(t).css("transition-delay"),o=parseFloat(e),r=parseFloat(n);return o||r?(e=e.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(e)+parseFloat(n))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){i.default(t).trigger("transitionend")},supportsTransitionEnd:function(){return Boolean("transitionend")},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var o=n[i],r=e[i],a=r&&l.isElement(r)?"element":null===(s=r)||"undefined"==typeof s?""+s:{}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(o).test(a))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+a+'" but expected type "'+o+'".')}var s},findShadowRoot:function(t){if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){var e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?l.findShadowRoot(t.parentNode):null},jQueryDetection:function(){if("undefined"==typeof i.default)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=i.default.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||t[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};l.jQueryDetection(),i.default.fn.emulateTransitionEnd=s,i.default.event.special[l.TRANSITION_END]={bindType:"transitionend",delegateType:"transitionend",handle:function(t){if(i.default(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}};var u="alert",f=i.default.fn[u],d=function(){function t(t){this._element=t}var e=t.prototype;return e.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},e.dispose=function(){i.default.removeData(this._element,"bs.alert"),this._element=null},e._getRootElement=function(t){var e=l.getSelectorFromElement(t),n=!1;return e&&(n=document.querySelector(e)),n||(n=i.default(t).closest(".alert")[0]),n},e._triggerCloseEvent=function(t){var e=i.default.Event("close.bs.alert");return i.default(t).trigger(e),e},e._removeElement=function(t){var e=this;if(i.default(t).removeClass("show"),i.default(t).hasClass("fade")){var n=l.getTransitionDurationFromElement(t);i.default(t).one(l.TRANSITION_END,(function(n){return e._destroyElement(t,n)})).emulateTransitionEnd(n)}else this._destroyElement(t)},e._destroyElement=function(t){i.default(t).detach().trigger("closed.bs.alert").remove()},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.alert");o||(o=new t(this),n.data("bs.alert",o)),"close"===e&&o[e](this)}))},t._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}}]),t}();i.default(document).on("click.bs.alert.data-api",'[data-dismiss="alert"]',d._handleDismiss(new d)),i.default.fn[u]=d._jQueryInterface,i.default.fn[u].Constructor=d,i.default.fn[u].noConflict=function(){return i.default.fn[u]=f,d._jQueryInterface};var c=i.default.fn.button,h=function(){function t(t){this._element=t,this.shouldAvoidTriggerChange=!1}var e=t.prototype;return e.toggle=function(){var t=!0,e=!0,n=i.default(this._element).closest('[data-toggle="buttons"]')[0];if(n){var o=this._element.querySelector('input:not([type="hidden"])');if(o){if("radio"===o.type)if(o.checked&&this._element.classList.contains("active"))t=!1;else{var r=n.querySelector(".active");r&&i.default(r).removeClass("active")}t&&("checkbox"!==o.type&&"radio"!==o.type||(o.checked=!this._element.classList.contains("active")),this.shouldAvoidTriggerChange||i.default(o).trigger("change")),o.focus(),e=!1}}this._element.hasAttribute("disabled")||this._element.classList.contains("disabled")||(e&&this._element.setAttribute("aria-pressed",!this._element.classList.contains("active")),t&&i.default(this._element).toggleClass("active"))},e.dispose=function(){i.default.removeData(this._element,"bs.button"),this._element=null},t._jQueryInterface=function(e,n){return this.each((function(){var o=i.default(this),r=o.data("bs.button");r||(r=new t(this),o.data("bs.button",r)),r.shouldAvoidTriggerChange=n,"toggle"===e&&r[e]()}))},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}}]),t}();i.default(document).on("click.bs.button.data-api",'[data-toggle^="button"]',(function(t){var e=t.target,n=e;if(i.default(e).hasClass("btn")||(e=i.default(e).closest(".btn")[0]),!e||e.hasAttribute("disabled")||e.classList.contains("disabled"))t.preventDefault();else{var o=e.querySelector('input:not([type="hidden"])');if(o&&(o.hasAttribute("disabled")||o.classList.contains("disabled")))return void t.preventDefault();"INPUT"!==n.tagName&&"LABEL"===e.tagName||h._jQueryInterface.call(i.default(e),"toggle","INPUT"===n.tagName)}})).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',(function(t){var e=i.default(t.target).closest(".btn")[0];i.default(e).toggleClass("focus",/^focus(in)?$/.test(t.type))})),i.default(window).on("load.bs.button.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')),e=0,n=t.length;e<n;e++){var i=t[e],o=i.querySelector('input:not([type="hidden"])');o.checked||o.hasAttribute("checked")?i.classList.add("active"):i.classList.remove("active")}for(var r=0,a=(t=[].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length;r<a;r++){var s=t[r];"true"===s.getAttribute("aria-pressed")?s.classList.add("active"):s.classList.remove("active")}})),i.default.fn.button=h._jQueryInterface,i.default.fn.button.Constructor=h,i.default.fn.button.noConflict=function(){return i.default.fn.button=c,h._jQueryInterface};var p="carousel",m=".bs.carousel",g=i.default.fn[p],v={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},_={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},b={TOUCH:"touch",PEN:"pen"},y=function(){function t(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(".carousel-indicators"),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var e=t.prototype;return e.next=function(){this._isSliding||this._slide("next")},e.nextWhenVisible=function(){var t=i.default(this._element);!document.hidden&&t.is(":visible")&&"hidden"!==t.css("visibility")&&this.next()},e.prev=function(){this._isSliding||this._slide("prev")},e.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(".carousel-item-next, .carousel-item-prev")&&(l.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function(t){var e=this;this._activeElement=this._element.querySelector(".active.carousel-item");var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)i.default(this._element).one("slid.bs.carousel",(function(){return e.to(t)}));else{if(n===t)return this.pause(),void this.cycle();var o=t>n?"next":"prev";this._slide(o,this._items[t])}},e.dispose=function(){i.default(this._element).off(m),i.default.removeData(this._element,"bs.carousel"),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function(t){return t=a({},v,t),l.typeCheckConfig(p,t,_),t},e._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;this.touchDeltaX=0,e>0&&this.prev(),e<0&&this.next()}},e._addEventListeners=function(){var t=this;this._config.keyboard&&i.default(this._element).on("keydown.bs.carousel",(function(e){return t._keydown(e)})),"hover"===this._config.pause&&i.default(this._element).on("mouseenter.bs.carousel",(function(e){return t.pause(e)})).on("mouseleave.bs.carousel",(function(e){return t.cycle(e)})),this._config.touch&&this._addTouchEventListeners()},e._addTouchEventListeners=function(){var t=this;if(this._touchSupported){var e=function(e){t._pointerEvent&&b[e.originalEvent.pointerType.toUpperCase()]?t.touchStartX=e.originalEvent.clientX:t._pointerEvent||(t.touchStartX=e.originalEvent.touches[0].clientX)},n=function(e){t._pointerEvent&&b[e.originalEvent.pointerType.toUpperCase()]&&(t.touchDeltaX=e.originalEvent.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout((function(e){return t.cycle(e)}),500+t._config.interval))};i.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel",(function(t){return t.preventDefault()})),this._pointerEvent?(i.default(this._element).on("pointerdown.bs.carousel",(function(t){return e(t)})),i.default(this._element).on("pointerup.bs.carousel",(function(t){return n(t)})),this._element.classList.add("pointer-event")):(i.default(this._element).on("touchstart.bs.carousel",(function(t){return e(t)})),i.default(this._element).on("touchmove.bs.carousel",(function(e){return function(e){e.originalEvent.touches&&e.originalEvent.touches.length>1?t.touchDeltaX=0:t.touchDeltaX=e.originalEvent.touches[0].clientX-t.touchStartX}(e)})),i.default(this._element).on("touchend.bs.carousel",(function(t){return n(t)})))}},e._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},e._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(".carousel-item")):[],this._items.indexOf(t)},e._getItemByDirection=function(t,e){var n="next"===t,i="prev"===t,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var a=(o+("prev"===t?-1:1))%this._items.length;return-1===a?this._items[this._items.length-1]:this._items[a]},e._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),o=this._getItemIndex(this._element.querySelector(".active.carousel-item")),r=i.default.Event("slide.bs.carousel",{relatedTarget:t,direction:e,from:o,to:n});return i.default(this._element).trigger(r),r},e._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var e=[].slice.call(this._indicatorsElement.querySelectorAll(".active"));i.default(e).removeClass("active");var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&i.default(n).addClass("active")}},e._slide=function(t,e){var n,o,r,a=this,s=this._element.querySelector(".active.carousel-item"),u=this._getItemIndex(s),f=e||s&&this._getItemByDirection(t,s),d=this._getItemIndex(f),c=Boolean(this._interval);if("next"===t?(n="carousel-item-left",o="carousel-item-next",r="left"):(n="carousel-item-right",o="carousel-item-prev",r="right"),f&&i.default(f).hasClass("active"))this._isSliding=!1;else if(!this._triggerSlideEvent(f,r).isDefaultPrevented()&&s&&f){this._isSliding=!0,c&&this.pause(),this._setActiveIndicatorElement(f);var h=i.default.Event("slid.bs.carousel",{relatedTarget:f,direction:r,from:u,to:d});if(i.default(this._element).hasClass("slide")){i.default(f).addClass(o),l.reflow(f),i.default(s).addClass(n),i.default(f).addClass(n);var p=parseInt(f.getAttribute("data-interval"),10);p?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=p):this._config.interval=this._config.defaultInterval||this._config.interval;var m=l.getTransitionDurationFromElement(s);i.default(s).one(l.TRANSITION_END,(function(){i.default(f).removeClass(n+" "+o).addClass("active"),i.default(s).removeClass("active "+o+" "+n),a._isSliding=!1,setTimeout((function(){return i.default(a._element).trigger(h)}),0)})).emulateTransitionEnd(m)}else i.default(s).removeClass("active"),i.default(f).addClass("active"),this._isSliding=!1,i.default(this._element).trigger(h);c&&this.cycle()}},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this).data("bs.carousel"),o=a({},v,i.default(this).data());"object"==typeof e&&(o=a({},o,e));var r="string"==typeof e?e:o.slide;if(n||(n=new t(this,o),i.default(this).data("bs.carousel",n)),"number"==typeof e)n.to(e);else if("string"==typeof r){if("undefined"==typeof n[r])throw new TypeError('No method named "'+r+'"');n[r]()}else o.interval&&o.ride&&(n.pause(),n.cycle())}))},t._dataApiClickHandler=function(e){var n=l.getSelectorFromElement(this);if(n){var o=i.default(n)[0];if(o&&i.default(o).hasClass("carousel")){var r=a({},i.default(o).data(),i.default(this).data()),s=this.getAttribute("data-slide-to");s&&(r.interval=!1),t._jQueryInterface.call(i.default(o),r),s&&i.default(o).data("bs.carousel").to(s),e.preventDefault()}}},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return v}}]),t}();i.default(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",y._dataApiClickHandler),i.default(window).on("load.bs.carousel.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-ride="carousel"]')),e=0,n=t.length;e<n;e++){var o=i.default(t[e]);y._jQueryInterface.call(o,o.data())}})),i.default.fn[p]=y._jQueryInterface,i.default.fn[p].Constructor=y,i.default.fn[p].noConflict=function(){return i.default.fn[p]=g,y._jQueryInterface};var w="collapse",E=i.default.fn[w],T={toggle:!0,parent:""},C={toggle:"boolean",parent:"(string|element)"},S=function(){function t(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var n=[].slice.call(document.querySelectorAll('[data-toggle="collapse"]')),i=0,o=n.length;i<o;i++){var r=n[i],a=l.getSelectorFromElement(r),s=[].slice.call(document.querySelectorAll(a)).filter((function(e){return e===t}));null!==a&&s.length>0&&(this._selector=a,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var e=t.prototype;return e.toggle=function(){i.default(this._element).hasClass("show")?this.hide():this.show()},e.show=function(){var e,n,o=this;if(!this._isTransitioning&&!i.default(this._element).hasClass("show")&&(this._parent&&0===(e=[].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((function(t){return"string"==typeof o._config.parent?t.getAttribute("data-parent")===o._config.parent:t.classList.contains("collapse")}))).length&&(e=null),!(e&&(n=i.default(e).not(this._selector).data("bs.collapse"))&&n._isTransitioning))){var r=i.default.Event("show.bs.collapse");if(i.default(this._element).trigger(r),!r.isDefaultPrevented()){e&&(t._jQueryInterface.call(i.default(e).not(this._selector),"hide"),n||i.default(e).data("bs.collapse",null));var a=this._getDimension();i.default(this._element).removeClass("collapse").addClass("collapsing"),this._element.style[a]=0,this._triggerArray.length&&i.default(this._triggerArray).removeClass("collapsed").attr("aria-expanded",!0),this.setTransitioning(!0);var s="scroll"+(a[0].toUpperCase()+a.slice(1)),u=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,(function(){i.default(o._element).removeClass("collapsing").addClass("collapse show"),o._element.style[a]="",o.setTransitioning(!1),i.default(o._element).trigger("shown.bs.collapse")})).emulateTransitionEnd(u),this._element.style[a]=this._element[s]+"px"}}},e.hide=function(){var t=this;if(!this._isTransitioning&&i.default(this._element).hasClass("show")){var e=i.default.Event("hide.bs.collapse");if(i.default(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",l.reflow(this._element),i.default(this._element).addClass("collapsing").removeClass("collapse show");var o=this._triggerArray.length;if(o>0)for(var r=0;r<o;r++){var a=this._triggerArray[r],s=l.getSelectorFromElement(a);if(null!==s)i.default([].slice.call(document.querySelectorAll(s))).hasClass("show")||i.default(a).addClass("collapsed").attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[n]="";var u=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,(function(){t.setTransitioning(!1),i.default(t._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")})).emulateTransitionEnd(u)}}},e.setTransitioning=function(t){this._isTransitioning=t},e.dispose=function(){i.default.removeData(this._element,"bs.collapse"),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},e._getConfig=function(t){return(t=a({},T,t)).toggle=Boolean(t.toggle),l.typeCheckConfig(w,t,C),t},e._getDimension=function(){return i.default(this._element).hasClass("width")?"width":"height"},e._getParent=function(){var e,n=this;l.isElement(this._config.parent)?(e=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(e=this._config.parent[0])):e=document.querySelector(this._config.parent);var o='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',r=[].slice.call(e.querySelectorAll(o));return i.default(r).each((function(e,i){n._addAriaAndCollapsedClass(t._getTargetFromElement(i),[i])})),e},e._addAriaAndCollapsedClass=function(t,e){var n=i.default(t).hasClass("show");e.length&&i.default(e).toggleClass("collapsed",!n).attr("aria-expanded",n)},t._getTargetFromElement=function(t){var e=l.getSelectorFromElement(t);return e?document.querySelector(e):null},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.collapse"),r=a({},T,n.data(),"object"==typeof e&&e?e:{});if(!o&&r.toggle&&"string"==typeof e&&/show|hide/.test(e)&&(r.toggle=!1),o||(o=new t(this,r),n.data("bs.collapse",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return T}}]),t}();i.default(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',(function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var e=i.default(this),n=l.getSelectorFromElement(this),o=[].slice.call(document.querySelectorAll(n));i.default(o).each((function(){var t=i.default(this),n=t.data("bs.collapse")?"toggle":e.data();S._jQueryInterface.call(t,n)}))})),i.default.fn[w]=S._jQueryInterface,i.default.fn[w].Constructor=S,i.default.fn[w].noConflict=function(){return i.default.fn[w]=E,S._jQueryInterface};var D="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,N=function(){for(var t=["Edge","Trident","Firefox"],e=0;e<t.length;e+=1)if(D&&navigator.userAgent.indexOf(t[e])>=0)return 1;return 0}();var k=D&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then((function(){e=!1,t()})))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout((function(){e=!1,t()}),N))}};function A(t){return t&&"[object Function]"==={}.toString.call(t)}function I(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function O(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function x(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=I(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?t:x(O(t))}function j(t){return t&&t.referenceNode?t.referenceNode:t}var L=D&&!(!window.MSInputMethodContext||!document.documentMode),P=D&&/MSIE 10/.test(navigator.userAgent);function F(t){return 11===t?L:10===t?P:L||P}function R(t){if(!t)return document.documentElement;for(var e=F(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===I(n,"position")?R(n):n:t?t.ownerDocument.documentElement:document.documentElement}function H(t){return null!==t.parentNode?H(t.parentNode):t}function M(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,o=n?e:t,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var a,s,l=r.commonAncestorContainer;if(t!==l&&e!==l||i.contains(o))return"BODY"===(s=(a=l).nodeName)||"HTML"!==s&&R(a.firstElementChild)!==a?R(l):l;var u=H(t);return u.host?M(u.host,e):M(t,H(e).host)}function B(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n="top"===e?"scrollTop":"scrollLeft",i=t.nodeName;if("BODY"===i||"HTML"===i){var o=t.ownerDocument.documentElement,r=t.ownerDocument.scrollingElement||o;return r[n]}return t[n]}function q(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=B(e,"top"),o=B(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}function Q(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"])+parseFloat(t["border"+i+"Width"])}function W(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],F(10)?parseInt(n["offset"+t])+parseInt(i["margin"+("Height"===t?"Top":"Left")])+parseInt(i["margin"+("Height"===t?"Bottom":"Right")]):0)}function U(t){var e=t.body,n=t.documentElement,i=F(10)&&getComputedStyle(n);return{height:W("Height",e,n,i),width:W("Width",e,n,i)}}var V=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Y=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),z=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},X=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function K(t){return X({},t,{right:t.left+t.width,bottom:t.top+t.height})}function G(t){var e={};try{if(F(10)){e=t.getBoundingClientRect();var n=B(t,"top"),i=B(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},r="HTML"===t.nodeName?U(t.ownerDocument):{},a=r.width||t.clientWidth||o.width,s=r.height||t.clientHeight||o.height,l=t.offsetWidth-a,u=t.offsetHeight-s;if(l||u){var f=I(t);l-=Q(f,"x"),u-=Q(f,"y"),o.width-=l,o.height-=u}return K(o)}function $(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=F(10),o="HTML"===e.nodeName,r=G(t),a=G(e),s=x(t),l=I(e),u=parseFloat(l.borderTopWidth),f=parseFloat(l.borderLeftWidth);n&&o&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var d=K({top:r.top-a.top-u,left:r.left-a.left-f,width:r.width,height:r.height});if(d.marginTop=0,d.marginLeft=0,!i&&o){var c=parseFloat(l.marginTop),h=parseFloat(l.marginLeft);d.top-=u-c,d.bottom-=u-c,d.left-=f-h,d.right-=f-h,d.marginTop=c,d.marginLeft=h}return(i&&!n?e.contains(s):e===s&&"BODY"!==s.nodeName)&&(d=q(d,e)),d}function J(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,i=$(t,n),o=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),a=e?0:B(n),s=e?0:B(n,"left"),l={top:a-i.top+i.marginTop,left:s-i.left+i.marginLeft,width:o,height:r};return K(l)}function Z(t){var e=t.nodeName;if("BODY"===e||"HTML"===e)return!1;if("fixed"===I(t,"position"))return!0;var n=O(t);return!!n&&Z(n)}function tt(t){if(!t||!t.parentElement||F())return document.documentElement;for(var e=t.parentElement;e&&"none"===I(e,"transform");)e=e.parentElement;return e||document.documentElement}function et(t,e,n,i){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},a=o?tt(t):M(t,j(e));if("viewport"===i)r=J(a,o);else{var s=void 0;"scrollParent"===i?"BODY"===(s=x(O(e))).nodeName&&(s=t.ownerDocument.documentElement):s="window"===i?t.ownerDocument.documentElement:i;var l=$(s,a,o);if("HTML"!==s.nodeName||Z(a))r=l;else{var u=U(t.ownerDocument),f=u.height,d=u.width;r.top+=l.top-l.marginTop,r.bottom=f+l.top,r.left+=l.left-l.marginLeft,r.right=d+l.left}}var c="number"==typeof(n=n||0);return r.left+=c?n:n.left||0,r.top+=c?n:n.top||0,r.right-=c?n:n.right||0,r.bottom-=c?n:n.bottom||0,r}function nt(t){return t.width*t.height}function it(t,e,n,i,o){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var a=et(n,i,r,o),s={top:{width:a.width,height:e.top-a.top},right:{width:a.right-e.right,height:a.height},bottom:{width:a.width,height:a.bottom-e.bottom},left:{width:e.left-a.left,height:a.height}},l=Object.keys(s).map((function(t){return X({key:t},s[t],{area:nt(s[t])})})).sort((function(t,e){return e.area-t.area})),u=l.filter((function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight})),f=u.length>0?u[0].key:l[0].key,d=t.split("-")[1];return f+(d?"-"+d:"")}function ot(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=i?tt(e):M(e,j(n));return $(n,o,i)}function rt(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),i=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function at(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,(function(t){return e[t]}))}function st(t,e,n){n=n.split("-")[0];var i=rt(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),a=r?"top":"left",s=r?"left":"top",l=r?"height":"width",u=r?"width":"height";return o[a]=e[a]+e[l]/2-i[l]/2,o[s]=n===s?e[s]-i[u]:e[at(s)],o}function lt(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function ut(t,e,n){return(void 0===n?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex((function(t){return t[e]===n}));var i=lt(t,(function(t){return t[e]===n}));return t.indexOf(i)}(t,"name",n))).forEach((function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=t.function||t.fn;t.enabled&&A(n)&&(e.offsets.popper=K(e.offsets.popper),e.offsets.reference=K(e.offsets.reference),e=n(e,t))})),e}function ft(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=ot(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=it(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=st(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=ut(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}function dt(t,e){return t.some((function(t){var n=t.name;return t.enabled&&n===e}))}function ct(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length;i++){var o=e[i],r=o?""+o+n:t;if("undefined"!=typeof document.body.style[r])return r}return null}function ht(){return this.state.isDestroyed=!0,dt(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[ct("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function pt(t){var e=t.ownerDocument;return e?e.defaultView:window}function mt(t,e,n,i){n.updateBound=i,pt(t).addEventListener("resize",n.updateBound,{passive:!0});var o=x(t);return function t(e,n,i,o){var r="BODY"===e.nodeName,a=r?e.ownerDocument.defaultView:e;a.addEventListener(n,i,{passive:!0}),r||t(x(a.parentNode),n,i,o),o.push(a)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function gt(){this.state.eventsEnabled||(this.state=mt(this.reference,this.options,this.state,this.scheduleUpdate))}function vt(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,pt(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach((function(t){t.removeEventListener("scroll",e.updateBound)})),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function _t(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function bt(t,e){Object.keys(e).forEach((function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&_t(e[n])&&(i="px"),t.style[n]=e[n]+i}))}var yt=D&&/Firefox/i.test(navigator.userAgent);function wt(t,e,n){var i=lt(t,(function(t){return t.name===e})),o=!!i&&t.some((function(t){return t.name===n&&t.enabled&&t.order<i.order}));if(!o){var r="`"+e+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var Et=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],Tt=Et.slice(3);function Ct(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Tt.indexOf(t),i=Tt.slice(n+1).concat(Tt.slice(0,n));return e?i.reverse():i}var St="flip",Dt="clockwise",Nt="counterclockwise";function kt(t,e,n,i){var o=[0,0],r=-1!==["right","left"].indexOf(i),a=t.split(/(\+|\-)/).map((function(t){return t.trim()})),s=a.indexOf(lt(a,(function(t){return-1!==t.search(/,|\s/)})));a[s]&&-1===a[s].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,u=-1!==s?[a.slice(0,s).concat([a[s].split(l)[0]]),[a[s].split(l)[1]].concat(a.slice(s+1))]:[a];return(u=u.map((function(t,i){var o=(1===i?!r:r)?"height":"width",a=!1;return t.reduce((function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,a=!0,t):a?(t[t.length-1]+=e,a=!1,t):t.concat(e)}),[]).map((function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],a=o[2];if(!r)return t;if(0===a.indexOf("%")){var s=void 0;switch(a){case"%p":s=n;break;case"%":case"%r":default:s=i}return K(s)[e]/100*r}if("vh"===a||"vw"===a){return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r}return r}(t,o,e,n)}))}))).forEach((function(t,e){t.forEach((function(n,i){_t(n)&&(o[e]+=n*("-"===t[i-1]?-1:1))}))})),o}var At={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,a=o.popper,s=-1!==["bottom","top"].indexOf(n),l=s?"left":"top",u=s?"width":"height",f={start:z({},l,r[l]),end:z({},l,r[l]+r[u]-a[u])};t.offsets.popper=X({},a,f[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,i=t.placement,o=t.offsets,r=o.popper,a=o.reference,s=i.split("-")[0],l=void 0;return l=_t(+n)?[+n,0]:kt(n,r,a,s),"left"===s?(r.top+=l[0],r.left-=l[1]):"right"===s?(r.top+=l[0],r.left+=l[1]):"top"===s?(r.left+=l[0],r.top-=l[1]):"bottom"===s&&(r.left+=l[0],r.top+=l[1]),t.popper=r,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){var n=e.boundariesElement||R(t.instance.popper);t.instance.reference===n&&(n=R(n));var i=ct("transform"),o=t.instance.popper.style,r=o.top,a=o.left,s=o[i];o.top="",o.left="",o[i]="";var l=et(t.instance.popper,t.instance.reference,e.padding,n,t.positionFixed);o.top=r,o.left=a,o[i]=s,e.boundaries=l;var u=e.priority,f=t.offsets.popper,d={primary:function(t){var n=f[t];return f[t]<l[t]&&!e.escapeWithReference&&(n=Math.max(f[t],l[t])),z({},t,n)},secondary:function(t){var n="right"===t?"left":"top",i=f[n];return f[t]>l[t]&&!e.escapeWithReference&&(i=Math.min(f[n],l[t]-("right"===t?f.width:f.height))),z({},n,i)}};return u.forEach((function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";f=X({},f,d[e](t))})),t.offsets.popper=f,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=Math.floor,a=-1!==["top","bottom"].indexOf(o),s=a?"right":"bottom",l=a?"left":"top",u=a?"width":"height";return n[s]<r(i[l])&&(t.offsets.popper[l]=r(i[l])-n[u]),n[l]>r(i[s])&&(t.offsets.popper[l]=r(i[s])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!wt(t.instance.modifiers,"arrow","keepTogether"))return t;var i=e.element;if("string"==typeof i){if(!(i=t.instance.popper.querySelector(i)))return t}else if(!t.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],r=t.offsets,a=r.popper,s=r.reference,l=-1!==["left","right"].indexOf(o),u=l?"height":"width",f=l?"Top":"Left",d=f.toLowerCase(),c=l?"left":"top",h=l?"bottom":"right",p=rt(i)[u];s[h]-p<a[d]&&(t.offsets.popper[d]-=a[d]-(s[h]-p)),s[d]+p>a[h]&&(t.offsets.popper[d]+=s[d]+p-a[h]),t.offsets.popper=K(t.offsets.popper);var m=s[d]+s[u]/2-p/2,g=I(t.instance.popper),v=parseFloat(g["margin"+f]),_=parseFloat(g["border"+f+"Width"]),b=m-t.offsets.popper[d]-v-_;return b=Math.max(Math.min(a[u]-p,b),0),t.arrowElement=i,t.offsets.arrow=(z(n={},d,Math.round(b)),z(n,c,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(dt(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=et(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement,t.positionFixed),i=t.placement.split("-")[0],o=at(i),r=t.placement.split("-")[1]||"",a=[];switch(e.behavior){case St:a=[i,o];break;case Dt:a=Ct(i);break;case Nt:a=Ct(i,!0);break;default:a=e.behavior}return a.forEach((function(s,l){if(i!==s||a.length===l+1)return t;i=t.placement.split("-")[0],o=at(i);var u=t.offsets.popper,f=t.offsets.reference,d=Math.floor,c="left"===i&&d(u.right)>d(f.left)||"right"===i&&d(u.left)<d(f.right)||"top"===i&&d(u.bottom)>d(f.top)||"bottom"===i&&d(u.top)<d(f.bottom),h=d(u.left)<d(n.left),p=d(u.right)>d(n.right),m=d(u.top)<d(n.top),g=d(u.bottom)>d(n.bottom),v="left"===i&&h||"right"===i&&p||"top"===i&&m||"bottom"===i&&g,_=-1!==["top","bottom"].indexOf(i),b=!!e.flipVariations&&(_&&"start"===r&&h||_&&"end"===r&&p||!_&&"start"===r&&m||!_&&"end"===r&&g),y=!!e.flipVariationsByContent&&(_&&"start"===r&&p||_&&"end"===r&&h||!_&&"start"===r&&g||!_&&"end"===r&&m),w=b||y;(c||v||w)&&(t.flipped=!0,(c||v)&&(i=a[l+1]),w&&(r=function(t){return"end"===t?"start":"start"===t?"end":t}(r)),t.placement=i+(r?"-"+r:""),t.offsets.popper=X({},t.offsets.popper,st(t.instance.popper,t.offsets.reference,t.placement)),t=ut(t.instance.modifiers,t,"flip"))})),t},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,a=-1!==["left","right"].indexOf(n),s=-1===["top","left"].indexOf(n);return o[a?"left":"top"]=r[n]-(s?o[a?"width":"height"]:0),t.placement=at(e),t.offsets.popper=K(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!wt(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=lt(t.instance.modifiers,(function(t){return"preventOverflow"===t.name})).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,o=t.offsets.popper,r=lt(t.instance.modifiers,(function(t){return"applyStyle"===t.name})).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==r?r:e.gpuAcceleration,s=R(t.instance.popper),l=G(s),u={position:o.position},f=function(t,e){var n=t.offsets,i=n.popper,o=n.reference,r=Math.round,a=Math.floor,s=function(t){return t},l=r(o.width),u=r(i.width),f=-1!==["left","right"].indexOf(t.placement),d=-1!==t.placement.indexOf("-"),c=e?f||d||l%2==u%2?r:a:s,h=e?r:s;return{left:c(l%2==1&&u%2==1&&!d&&e?i.left-1:i.left),top:h(i.top),bottom:h(i.bottom),right:c(i.right)}}(t,window.devicePixelRatio<2||!yt),d="bottom"===n?"top":"bottom",c="right"===i?"left":"right",h=ct("transform"),p=void 0,m=void 0;if(m="bottom"===d?"HTML"===s.nodeName?-s.clientHeight+f.bottom:-l.height+f.bottom:f.top,p="right"===c?"HTML"===s.nodeName?-s.clientWidth+f.right:-l.width+f.right:f.left,a&&h)u[h]="translate3d("+p+"px, "+m+"px, 0)",u[d]=0,u[c]=0,u.willChange="transform";else{var g="bottom"===d?-1:1,v="right"===c?-1:1;u[d]=m*g,u[c]=p*v,u.willChange=d+", "+c}var _={"x-placement":t.placement};return t.attributes=X({},_,t.attributes),t.styles=X({},u,t.styles),t.arrowStyles=X({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return bt(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach((function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)})),t.arrowElement&&Object.keys(t.arrowStyles).length&&bt(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,i,o){var r=ot(o,e,t,n.positionFixed),a=it(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",a),bt(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},It=function(){function t(e,n){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};V(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=k(this.update.bind(this)),this.options=X({},t.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(X({},t.Defaults.modifiers,o.modifiers)).forEach((function(e){i.options.modifiers[e]=X({},t.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(t){return X({name:t},i.options.modifiers[t])})).sort((function(t,e){return t.order-e.order})),this.modifiers.forEach((function(t){t.enabled&&A(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)})),this.update();var r=this.options.eventsEnabled;r&&this.enableEventListeners(),this.state.eventsEnabled=r}return Y(t,[{key:"update",value:function(){return ft.call(this)}},{key:"destroy",value:function(){return ht.call(this)}},{key:"enableEventListeners",value:function(){return gt.call(this)}},{key:"disableEventListeners",value:function(){return vt.call(this)}}]),t}();It.Utils=("undefined"!=typeof window?window:global).PopperUtils,It.placements=Et,It.Defaults=At;var Ot="dropdown",xt=i.default.fn[Ot],jt=new RegExp("38|40|27"),Lt={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic",popperConfig:null},Pt={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},Ft=function(){function t(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var e=t.prototype;return e.toggle=function(){if(!this._element.disabled&&!i.default(this._element).hasClass("disabled")){var e=i.default(this._menu).hasClass("show");t._clearMenus(),e||this.show(!0)}},e.show=function(e){if(void 0===e&&(e=!1),!(this._element.disabled||i.default(this._element).hasClass("disabled")||i.default(this._menu).hasClass("show"))){var n={relatedTarget:this._element},o=i.default.Event("show.bs.dropdown",n),r=t._getParentFromElement(this._element);if(i.default(r).trigger(o),!o.isDefaultPrevented()){if(!this._inNavbar&&e){if("undefined"==typeof It)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var a=this._element;"parent"===this._config.reference?a=r:l.isElement(this._config.reference)&&(a=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(a=this._config.reference[0])),"scrollParent"!==this._config.boundary&&i.default(r).addClass("position-static"),this._popper=new It(a,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===i.default(r).closest(".navbar-nav").length&&i.default(document.body).children().on("mouseover",null,i.default.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),i.default(this._menu).toggleClass("show"),i.default(r).toggleClass("show").trigger(i.default.Event("shown.bs.dropdown",n))}}},e.hide=function(){if(!this._element.disabled&&!i.default(this._element).hasClass("disabled")&&i.default(this._menu).hasClass("show")){var e={relatedTarget:this._element},n=i.default.Event("hide.bs.dropdown",e),o=t._getParentFromElement(this._element);i.default(o).trigger(n),n.isDefaultPrevented()||(this._popper&&this._popper.destroy(),i.default(this._menu).toggleClass("show"),i.default(o).toggleClass("show").trigger(i.default.Event("hidden.bs.dropdown",e)))}},e.dispose=function(){i.default.removeData(this._element,"bs.dropdown"),i.default(this._element).off(".bs.dropdown"),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},e.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},e._addEventListeners=function(){var t=this;i.default(this._element).on("click.bs.dropdown",(function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}))},e._getConfig=function(t){return t=a({},this.constructor.Default,i.default(this._element).data(),t),l.typeCheckConfig(Ot,t,this.constructor.DefaultType),t},e._getMenuElement=function(){if(!this._menu){var e=t._getParentFromElement(this._element);e&&(this._menu=e.querySelector(".dropdown-menu"))}return this._menu},e._getPlacement=function(){var t=i.default(this._element.parentNode),e="bottom-start";return t.hasClass("dropup")?e=i.default(this._menu).hasClass("dropdown-menu-right")?"top-end":"top-start":t.hasClass("dropright")?e="right-start":t.hasClass("dropleft")?e="left-start":i.default(this._menu).hasClass("dropdown-menu-right")&&(e="bottom-end"),e},e._detectNavbar=function(){return i.default(this._element).closest(".navbar").length>0},e._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=a({},e.offsets,t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},e._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(t.modifiers.applyStyle={enabled:!1}),a({},t,this._config.popperConfig)},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this).data("bs.dropdown");if(n||(n=new t(this,"object"==typeof e?e:null),i.default(this).data("bs.dropdown",n)),"string"==typeof e){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},t._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var n=[].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')),o=0,r=n.length;o<r;o++){var a=t._getParentFromElement(n[o]),s=i.default(n[o]).data("bs.dropdown"),l={relatedTarget:n[o]};if(e&&"click"===e.type&&(l.clickEvent=e),s){var u=s._menu;if(i.default(a).hasClass("show")&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&i.default.contains(a,e.target))){var f=i.default.Event("hide.bs.dropdown",l);i.default(a).trigger(f),f.isDefaultPrevented()||("ontouchstart"in document.documentElement&&i.default(document.body).children().off("mouseover",null,i.default.noop),n[o].setAttribute("aria-expanded","false"),s._popper&&s._popper.destroy(),i.default(u).removeClass("show"),i.default(a).removeClass("show").trigger(i.default.Event("hidden.bs.dropdown",l)))}}}},t._getParentFromElement=function(t){var e,n=l.getSelectorFromElement(t);return n&&(e=document.querySelector(n)),e||t.parentNode},t._dataApiKeydownHandler=function(e){if(!(/input|textarea/i.test(e.target.tagName)?32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||i.default(e.target).closest(".dropdown-menu").length):!jt.test(e.which))&&!this.disabled&&!i.default(this).hasClass("disabled")){var n=t._getParentFromElement(this),o=i.default(n).hasClass("show");if(o||27!==e.which){if(e.preventDefault(),e.stopPropagation(),!o||27===e.which||32===e.which)return 27===e.which&&i.default(n.querySelector('[data-toggle="dropdown"]')).trigger("focus"),void i.default(this).trigger("click");var r=[].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter((function(t){return i.default(t).is(":visible")}));if(0!==r.length){var a=r.indexOf(e.target);38===e.which&&a>0&&a--,40===e.which&&a<r.length-1&&a++,a<0&&(a=0),r[a].focus()}}}},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return Lt}},{key:"DefaultType",get:function(){return Pt}}]),t}();i.default(document).on("keydown.bs.dropdown.data-api",'[data-toggle="dropdown"]',Ft._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api",".dropdown-menu",Ft._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api",Ft._clearMenus).on("click.bs.dropdown.data-api",'[data-toggle="dropdown"]',(function(t){t.preventDefault(),t.stopPropagation(),Ft._jQueryInterface.call(i.default(this),"toggle")})).on("click.bs.dropdown.data-api",".dropdown form",(function(t){t.stopPropagation()})),i.default.fn[Ot]=Ft._jQueryInterface,i.default.fn[Ot].Constructor=Ft,i.default.fn[Ot].noConflict=function(){return i.default.fn[Ot]=xt,Ft._jQueryInterface};var Rt=i.default.fn.modal,Ht={backdrop:!0,keyboard:!0,focus:!0,show:!0},Mt={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},Bt=function(){function t(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(".modal-dialog"),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var e=t.prototype;return e.toggle=function(t){return this._isShown?this.hide():this.show(t)},e.show=function(t){var e=this;if(!this._isShown&&!this._isTransitioning){i.default(this._element).hasClass("fade")&&(this._isTransitioning=!0);var n=i.default.Event("show.bs.modal",{relatedTarget:t});i.default(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),i.default(this._element).on("click.dismiss.bs.modal",'[data-dismiss="modal"]',(function(t){return e.hide(t)})),i.default(this._dialog).on("mousedown.dismiss.bs.modal",(function(){i.default(e._element).one("mouseup.dismiss.bs.modal",(function(t){i.default(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)}))})),this._showBackdrop((function(){return e._showElement(t)})))}},e.hide=function(t){var e=this;if(t&&t.preventDefault(),this._isShown&&!this._isTransitioning){var n=i.default.Event("hide.bs.modal");if(i.default(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var o=i.default(this._element).hasClass("fade");if(o&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),i.default(document).off("focusin.bs.modal"),i.default(this._element).removeClass("show"),i.default(this._element).off("click.dismiss.bs.modal"),i.default(this._dialog).off("mousedown.dismiss.bs.modal"),o){var r=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,(function(t){return e._hideModal(t)})).emulateTransitionEnd(r)}else this._hideModal()}}},e.dispose=function(){[window,this._element,this._dialog].forEach((function(t){return i.default(t).off(".bs.modal")})),i.default(document).off("focusin.bs.modal"),i.default.removeData(this._element,"bs.modal"),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},e.handleUpdate=function(){this._adjustDialog()},e._getConfig=function(t){return t=a({},Ht,t),l.typeCheckConfig("modal",t,Mt),t},e._triggerBackdropTransition=function(){var t=this;if("static"===this._config.backdrop){var e=i.default.Event("hidePrevented.bs.modal");if(i.default(this._element).trigger(e),e.isDefaultPrevented())return;var n=this._element.scrollHeight>document.documentElement.clientHeight;n||(this._element.style.overflowY="hidden"),this._element.classList.add("modal-static");var o=l.getTransitionDurationFromElement(this._dialog);i.default(this._element).off(l.TRANSITION_END),i.default(this._element).one(l.TRANSITION_END,(function(){t._element.classList.remove("modal-static"),n||i.default(t._element).one(l.TRANSITION_END,(function(){t._element.style.overflowY=""})).emulateTransitionEnd(t._element,o)})).emulateTransitionEnd(o),this._element.focus()}else this.hide()},e._showElement=function(t){var e=this,n=i.default(this._element).hasClass("fade"),o=this._dialog?this._dialog.querySelector(".modal-body"):null;this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),i.default(this._dialog).hasClass("modal-dialog-scrollable")&&o?o.scrollTop=0:this._element.scrollTop=0,n&&l.reflow(this._element),i.default(this._element).addClass("show"),this._config.focus&&this._enforceFocus();var r=i.default.Event("shown.bs.modal",{relatedTarget:t}),a=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,i.default(e._element).trigger(r)};if(n){var s=l.getTransitionDurationFromElement(this._dialog);i.default(this._dialog).one(l.TRANSITION_END,a).emulateTransitionEnd(s)}else a()},e._enforceFocus=function(){var t=this;i.default(document).off("focusin.bs.modal").on("focusin.bs.modal",(function(e){document!==e.target&&t._element!==e.target&&0===i.default(t._element).has(e.target).length&&t._element.focus()}))},e._setEscapeEvent=function(){var t=this;this._isShown?i.default(this._element).on("keydown.dismiss.bs.modal",(function(e){t._config.keyboard&&27===e.which?(e.preventDefault(),t.hide()):t._config.keyboard||27!==e.which||t._triggerBackdropTransition()})):this._isShown||i.default(this._element).off("keydown.dismiss.bs.modal")},e._setResizeEvent=function(){var t=this;this._isShown?i.default(window).on("resize.bs.modal",(function(e){return t.handleUpdate(e)})):i.default(window).off("resize.bs.modal")},e._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._showBackdrop((function(){i.default(document.body).removeClass("modal-open"),t._resetAdjustments(),t._resetScrollbar(),i.default(t._element).trigger("hidden.bs.modal")}))},e._removeBackdrop=function(){this._backdrop&&(i.default(this._backdrop).remove(),this._backdrop=null)},e._showBackdrop=function(t){var e=this,n=i.default(this._element).hasClass("fade")?"fade":"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className="modal-backdrop",n&&this._backdrop.classList.add(n),i.default(this._backdrop).appendTo(document.body),i.default(this._element).on("click.dismiss.bs.modal",(function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&e._triggerBackdropTransition()})),n&&l.reflow(this._backdrop),i.default(this._backdrop).addClass("show"),!t)return;if(!n)return void t();var o=l.getTransitionDurationFromElement(this._backdrop);i.default(this._backdrop).one(l.TRANSITION_END,t).emulateTransitionEnd(o)}else if(!this._isShown&&this._backdrop){i.default(this._backdrop).removeClass("show");var r=function(){e._removeBackdrop(),t&&t()};if(i.default(this._element).hasClass("fade")){var a=l.getTransitionDurationFromElement(this._backdrop);i.default(this._backdrop).one(l.TRANSITION_END,r).emulateTransitionEnd(a)}else r()}else t&&t()},e._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=Math.round(t.left+t.right)<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){var e=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),n=[].slice.call(document.querySelectorAll(".sticky-top"));i.default(e).each((function(e,n){var o=n.style.paddingRight,r=i.default(n).css("padding-right");i.default(n).data("padding-right",o).css("padding-right",parseFloat(r)+t._scrollbarWidth+"px")})),i.default(n).each((function(e,n){var o=n.style.marginRight,r=i.default(n).css("margin-right");i.default(n).data("margin-right",o).css("margin-right",parseFloat(r)-t._scrollbarWidth+"px")}));var o=document.body.style.paddingRight,r=i.default(document.body).css("padding-right");i.default(document.body).data("padding-right",o).css("padding-right",parseFloat(r)+this._scrollbarWidth+"px")}i.default(document.body).addClass("modal-open")},e._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));i.default(t).each((function(t,e){var n=i.default(e).data("padding-right");i.default(e).removeData("padding-right"),e.style.paddingRight=n||""}));var e=[].slice.call(document.querySelectorAll(".sticky-top"));i.default(e).each((function(t,e){var n=i.default(e).data("margin-right");"undefined"!=typeof n&&i.default(e).css("margin-right",n).removeData("margin-right")}));var n=i.default(document.body).data("padding-right");i.default(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},e._getScrollbarWidth=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},t._jQueryInterface=function(e,n){return this.each((function(){var o=i.default(this).data("bs.modal"),r=a({},Ht,i.default(this).data(),"object"==typeof e&&e?e:{});if(o||(o=new t(this,r),i.default(this).data("bs.modal",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e](n)}else r.show&&o.show(n)}))},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return Ht}}]),t}();i.default(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',(function(t){var e,n=this,o=l.getSelectorFromElement(this);o&&(e=document.querySelector(o));var r=i.default(e).data("bs.modal")?"toggle":a({},i.default(e).data(),i.default(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var s=i.default(e).one("show.bs.modal",(function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",(function(){i.default(n).is(":visible")&&n.focus()}))}));Bt._jQueryInterface.call(i.default(e),r,this)})),i.default.fn.modal=Bt._jQueryInterface,i.default.fn.modal.Constructor=Bt,i.default.fn.modal.noConflict=function(){return i.default.fn.modal=Rt,Bt._jQueryInterface};var qt=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],Qt={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Wt=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,Ut=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;function Vt(t,e,n){if(0===t.length)return t;if(n&&"function"==typeof n)return n(t);for(var i=(new window.DOMParser).parseFromString(t,"text/html"),o=Object.keys(e),r=[].slice.call(i.body.querySelectorAll("*")),a=function(t,n){var i=r[t],a=i.nodeName.toLowerCase();if(-1===o.indexOf(i.nodeName.toLowerCase()))return i.parentNode.removeChild(i),"continue";var s=[].slice.call(i.attributes),l=[].concat(e["*"]||[],e[a]||[]);s.forEach((function(t){(function(t,e){var n=t.nodeName.toLowerCase();if(-1!==e.indexOf(n))return-1===qt.indexOf(n)||Boolean(t.nodeValue.match(Wt)||t.nodeValue.match(Ut));for(var i=e.filter((function(t){return t instanceof RegExp})),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return!0;return!1})(t,l)||i.removeAttribute(t.nodeName)}))},s=0,l=r.length;s<l;s++)a(s);return i.body.innerHTML}var Yt="tooltip",zt=i.default.fn[Yt],Xt=new RegExp("(^|\\s)bs-tooltip\\S+","g"),Kt=["sanitize","whiteList","sanitizeFn"],Gt={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object",popperConfig:"(null|object)"},$t={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},Jt={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:Qt,popperConfig:null},Zt={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},te=function(){function t(t,e){if("undefined"==typeof It)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var e=t.prototype;return e.enable=function(){this._isEnabled=!0},e.disable=function(){this._isEnabled=!1},e.toggleEnabled=function(){this._isEnabled=!this._isEnabled},e.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=i.default(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),i.default(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(i.default(this.getTipElement()).hasClass("show"))return void this._leave(null,this);this._enter(null,this)}},e.dispose=function(){clearTimeout(this._timeout),i.default.removeData(this.element,this.constructor.DATA_KEY),i.default(this.element).off(this.constructor.EVENT_KEY),i.default(this.element).closest(".modal").off("hide.bs.modal",this._hideModalHandler),this.tip&&i.default(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},e.show=function(){var t=this;if("none"===i.default(this.element).css("display"))throw new Error("Please use show on visible elements");var e=i.default.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){i.default(this.element).trigger(e);var n=l.findShadowRoot(this.element),o=i.default.contains(null!==n?n:this.element.ownerDocument.documentElement,this.element);if(e.isDefaultPrevented()||!o)return;var r=this.getTipElement(),a=l.getUID(this.constructor.NAME);r.setAttribute("id",a),this.element.setAttribute("aria-describedby",a),this.setContent(),this.config.animation&&i.default(r).addClass("fade");var s="function"==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,u=this._getAttachment(s);this.addAttachmentClass(u);var f=this._getContainer();i.default(r).data(this.constructor.DATA_KEY,this),i.default.contains(this.element.ownerDocument.documentElement,this.tip)||i.default(r).appendTo(f),i.default(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new It(this.element,r,this._getPopperConfig(u)),i.default(r).addClass("show"),"ontouchstart"in document.documentElement&&i.default(document.body).children().on("mouseover",null,i.default.noop);var d=function(){t.config.animation&&t._fixTransition();var e=t._hoverState;t._hoverState=null,i.default(t.element).trigger(t.constructor.Event.SHOWN),"out"===e&&t._leave(null,t)};if(i.default(this.tip).hasClass("fade")){var c=l.getTransitionDurationFromElement(this.tip);i.default(this.tip).one(l.TRANSITION_END,d).emulateTransitionEnd(c)}else d()}},e.hide=function(t){var e=this,n=this.getTipElement(),o=i.default.Event(this.constructor.Event.HIDE),r=function(){"show"!==e._hoverState&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),i.default(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};if(i.default(this.element).trigger(o),!o.isDefaultPrevented()){if(i.default(n).removeClass("show"),"ontouchstart"in document.documentElement&&i.default(document.body).children().off("mouseover",null,i.default.noop),this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,i.default(this.tip).hasClass("fade")){var a=l.getTransitionDurationFromElement(n);i.default(n).one(l.TRANSITION_END,r).emulateTransitionEnd(a)}else r();this._hoverState=""}},e.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},e.isWithContent=function(){return Boolean(this.getTitle())},e.addAttachmentClass=function(t){i.default(this.getTipElement()).addClass("bs-tooltip-"+t)},e.getTipElement=function(){return this.tip=this.tip||i.default(this.config.template)[0],this.tip},e.setContent=function(){var t=this.getTipElement();this.setElementContent(i.default(t.querySelectorAll(".tooltip-inner")),this.getTitle()),i.default(t).removeClass("fade show")},e.setElementContent=function(t,e){"object"!=typeof e||!e.nodeType&&!e.jquery?this.config.html?(this.config.sanitize&&(e=Vt(e,this.config.whiteList,this.config.sanitizeFn)),t.html(e)):t.text(e):this.config.html?i.default(e).parent().is(t)||t.empty().append(e):t.text(i.default(e).text())},e.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},e._getPopperConfig=function(t){var e=this;return a({},{placement:t,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:".arrow"},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}},this.config.popperConfig)},e._getOffset=function(){var t=this,e={};return"function"==typeof this.config.offset?e.fn=function(e){return e.offsets=a({},e.offsets,t.config.offset(e.offsets,t.element)||{}),e}:e.offset=this.config.offset,e},e._getContainer=function(){return!1===this.config.container?document.body:l.isElement(this.config.container)?i.default(this.config.container):i.default(document).find(this.config.container)},e._getAttachment=function(t){return $t[t.toUpperCase()]},e._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach((function(e){if("click"===e)i.default(t.element).on(t.constructor.Event.CLICK,t.config.selector,(function(e){return t.toggle(e)}));else if("manual"!==e){var n="hover"===e?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,o="hover"===e?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;i.default(t.element).on(n,t.config.selector,(function(e){return t._enter(e)})).on(o,t.config.selector,(function(e){return t._leave(e)}))}})),this._hideModalHandler=function(){t.element&&t.hide()},i.default(this.element).closest(".modal").on("hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=a({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},e._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},e._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||i.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),i.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?"focus":"hover"]=!0),i.default(e.getTipElement()).hasClass("show")||"show"===e._hoverState?e._hoverState="show":(clearTimeout(e._timeout),e._hoverState="show",e.config.delay&&e.config.delay.show?e._timeout=setTimeout((function(){"show"===e._hoverState&&e.show()}),e.config.delay.show):e.show())},e._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||i.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),i.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?"focus":"hover"]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState="out",e.config.delay&&e.config.delay.hide?e._timeout=setTimeout((function(){"out"===e._hoverState&&e.hide()}),e.config.delay.hide):e.hide())},e._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},e._getConfig=function(t){var e=i.default(this.element).data();return Object.keys(e).forEach((function(t){-1!==Kt.indexOf(t)&&delete e[t]})),"number"==typeof(t=a({},this.constructor.Default,e,"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),l.typeCheckConfig(Yt,t,this.constructor.DefaultType),t.sanitize&&(t.template=Vt(t.template,t.whiteList,t.sanitizeFn)),t},e._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},e._cleanTipClass=function(){var t=i.default(this.getTipElement()),e=t.attr("class").match(Xt);null!==e&&e.length&&t.removeClass(e.join(""))},e._handlePopperPlacementChange=function(t){this.tip=t.instance.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},e._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(i.default(t).removeClass("fade"),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.tooltip"),r="object"==typeof e&&e;if((o||!/dispose|hide/.test(e))&&(o||(o=new t(this,r),n.data("bs.tooltip",o)),"string"==typeof e)){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return Jt}},{key:"NAME",get:function(){return Yt}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return Zt}},{key:"EVENT_KEY",get:function(){return".bs.tooltip"}},{key:"DefaultType",get:function(){return Gt}}]),t}();i.default.fn[Yt]=te._jQueryInterface,i.default.fn[Yt].Constructor=te,i.default.fn[Yt].noConflict=function(){return i.default.fn[Yt]=zt,te._jQueryInterface};var ee="popover",ne=i.default.fn[ee],ie=new RegExp("(^|\\s)bs-popover\\S+","g"),oe=a({},te.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),re=a({},te.DefaultType,{content:"(string|element|function)"}),ae={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"},se=function(t){var e,n;function o(){return t.apply(this,arguments)||this}n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var a=o.prototype;return a.isWithContent=function(){return this.getTitle()||this._getContent()},a.addAttachmentClass=function(t){i.default(this.getTipElement()).addClass("bs-popover-"+t)},a.getTipElement=function(){return this.tip=this.tip||i.default(this.config.template)[0],this.tip},a.setContent=function(){var t=i.default(this.getTipElement());this.setElementContent(t.find(".popover-header"),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this.element)),this.setElementContent(t.find(".popover-body"),e),t.removeClass("fade show")},a._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},a._cleanTipClass=function(){var t=i.default(this.getTipElement()),e=t.attr("class").match(ie);null!==e&&e.length>0&&t.removeClass(e.join(""))},o._jQueryInterface=function(t){return this.each((function(){var e=i.default(this).data("bs.popover"),n="object"==typeof t?t:null;if((e||!/dispose|hide/.test(t))&&(e||(e=new o(this,n),i.default(this).data("bs.popover",e)),"string"==typeof t)){if("undefined"==typeof e[t])throw new TypeError('No method named "'+t+'"');e[t]()}}))},r(o,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return oe}},{key:"NAME",get:function(){return ee}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return ae}},{key:"EVENT_KEY",get:function(){return".bs.popover"}},{key:"DefaultType",get:function(){return re}}]),o}(te);i.default.fn[ee]=se._jQueryInterface,i.default.fn[ee].Constructor=se,i.default.fn[ee].noConflict=function(){return i.default.fn[ee]=ne,se._jQueryInterface};var le="scrollspy",ue=i.default.fn[le],fe={offset:10,method:"auto",target:""},de={offset:"number",method:"string",target:"(string|element)"},ce=function(){function t(t,e){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" .nav-link,"+this._config.target+" .list-group-item,"+this._config.target+" .dropdown-item",this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,i.default(this._scrollElement).on("scroll.bs.scrollspy",(function(t){return n._process(t)})),this.refresh(),this._process()}var e=t.prototype;return e.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?"offset":"position",n="auto"===this._config.method?e:this._config.method,o="position"===n?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map((function(t){var e,r=l.getSelectorFromElement(t);if(r&&(e=document.querySelector(r)),e){var a=e.getBoundingClientRect();if(a.width||a.height)return[i.default(e)[n]().top+o,r]}return null})).filter((function(t){return t})).sort((function(t,e){return t[0]-e[0]})).forEach((function(e){t._offsets.push(e[0]),t._targets.push(e[1])}))},e.dispose=function(){i.default.removeData(this._element,"bs.scrollspy"),i.default(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},e._getConfig=function(t){if("string"!=typeof(t=a({},fe,"object"==typeof t&&t?t:{})).target&&l.isElement(t.target)){var e=i.default(t.target).attr("id");e||(e=l.getUID(le),i.default(t.target).attr("id",e)),t.target="#"+e}return l.typeCheckConfig(le,t,de),t},e._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&("undefined"==typeof this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}}},e._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",").map((function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'})),n=i.default([].slice.call(document.querySelectorAll(e.join(","))));n.hasClass("dropdown-item")?(n.closest(".dropdown").find(".dropdown-toggle").addClass("active"),n.addClass("active")):(n.addClass("active"),n.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"),n.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")),i.default(this._scrollElement).trigger("activate.bs.scrollspy",{relatedTarget:t})},e._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter((function(t){return t.classList.contains("active")})).forEach((function(t){return t.classList.remove("active")}))},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this).data("bs.scrollspy");if(n||(n=new t(this,"object"==typeof e&&e),i.default(this).data("bs.scrollspy",n)),"string"==typeof e){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return fe}}]),t}();i.default(window).on("load.bs.scrollspy.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-spy="scroll"]')),e=t.length;e--;){var n=i.default(t[e]);ce._jQueryInterface.call(n,n.data())}})),i.default.fn[le]=ce._jQueryInterface,i.default.fn[le].Constructor=ce,i.default.fn[le].noConflict=function(){return i.default.fn[le]=ue,ce._jQueryInterface};var he=i.default.fn.tab,pe=function(){function t(t){this._element=t}var e=t.prototype;return e.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&i.default(this._element).hasClass("active")||i.default(this._element).hasClass("disabled"))){var e,n,o=i.default(this._element).closest(".nav, .list-group")[0],r=l.getSelectorFromElement(this._element);if(o){var a="UL"===o.nodeName||"OL"===o.nodeName?"> li > .active":".active";n=(n=i.default.makeArray(i.default(o).find(a)))[n.length-1]}var s=i.default.Event("hide.bs.tab",{relatedTarget:this._element}),u=i.default.Event("show.bs.tab",{relatedTarget:n});if(n&&i.default(n).trigger(s),i.default(this._element).trigger(u),!u.isDefaultPrevented()&&!s.isDefaultPrevented()){r&&(e=document.querySelector(r)),this._activate(this._element,o);var f=function(){var e=i.default.Event("hidden.bs.tab",{relatedTarget:t._element}),o=i.default.Event("shown.bs.tab",{relatedTarget:n});i.default(n).trigger(e),i.default(t._element).trigger(o)};e?this._activate(e,e.parentNode,f):f()}}},e.dispose=function(){i.default.removeData(this._element,"bs.tab"),this._element=null},e._activate=function(t,e,n){var o=this,r=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?i.default(e).children(".active"):i.default(e).find("> li > .active"))[0],a=n&&r&&i.default(r).hasClass("fade"),s=function(){return o._transitionComplete(t,r,n)};if(r&&a){var u=l.getTransitionDurationFromElement(r);i.default(r).removeClass("show").one(l.TRANSITION_END,s).emulateTransitionEnd(u)}else s()},e._transitionComplete=function(t,e,n){if(e){i.default(e).removeClass("active");var o=i.default(e.parentNode).find("> .dropdown-menu .active")[0];o&&i.default(o).removeClass("active"),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}if(i.default(t).addClass("active"),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),l.reflow(t),t.classList.contains("fade")&&t.classList.add("show"),t.parentNode&&i.default(t.parentNode).hasClass("dropdown-menu")){var r=i.default(t).closest(".dropdown")[0];if(r){var a=[].slice.call(r.querySelectorAll(".dropdown-toggle"));i.default(a).addClass("active")}t.setAttribute("aria-expanded",!0)}n&&n()},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.tab");if(o||(o=new t(this),n.data("bs.tab",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e]()}}))},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}}]),t}();i.default(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',(function(t){t.preventDefault(),pe._jQueryInterface.call(i.default(this),"show")})),i.default.fn.tab=pe._jQueryInterface,i.default.fn.tab.Constructor=pe,i.default.fn.tab.noConflict=function(){return i.default.fn.tab=he,pe._jQueryInterface};var me=i.default.fn.toast,ge={animation:"boolean",autohide:"boolean",delay:"number"},ve={animation:!0,autohide:!0,delay:500},_e=function(){function t(t,e){this._element=t,this._config=this._getConfig(e),this._timeout=null,this._setListeners()}var e=t.prototype;return e.show=function(){var t=this,e=i.default.Event("show.bs.toast");if(i.default(this._element).trigger(e),!e.isDefaultPrevented()){this._clearTimeout(),this._config.animation&&this._element.classList.add("fade");var n=function(){t._element.classList.remove("showing"),t._element.classList.add("show"),i.default(t._element).trigger("shown.bs.toast"),t._config.autohide&&(t._timeout=setTimeout((function(){t.hide()}),t._config.delay))};if(this._element.classList.remove("hide"),l.reflow(this._element),this._element.classList.add("showing"),this._config.animation){var o=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,n).emulateTransitionEnd(o)}else n()}},e.hide=function(){if(this._element.classList.contains("show")){var t=i.default.Event("hide.bs.toast");i.default(this._element).trigger(t),t.isDefaultPrevented()||this._close()}},e.dispose=function(){this._clearTimeout(),this._element.classList.contains("show")&&this._element.classList.remove("show"),i.default(this._element).off("click.dismiss.bs.toast"),i.default.removeData(this._element,"bs.toast"),this._element=null,this._config=null},e._getConfig=function(t){return t=a({},ve,i.default(this._element).data(),"object"==typeof t&&t?t:{}),l.typeCheckConfig("toast",t,this.constructor.DefaultType),t},e._setListeners=function(){var t=this;i.default(this._element).on("click.dismiss.bs.toast",'[data-dismiss="toast"]',(function(){return t.hide()}))},e._close=function(){var t=this,e=function(){t._element.classList.add("hide"),i.default(t._element).trigger("hidden.bs.toast")};if(this._element.classList.remove("show"),this._config.animation){var n=l.getTransitionDurationFromElement(this._element);i.default(this._element).one(l.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},e._clearTimeout=function(){clearTimeout(this._timeout),this._timeout=null},t._jQueryInterface=function(e){return this.each((function(){var n=i.default(this),o=n.data("bs.toast");if(o||(o=new t(this,"object"==typeof e&&e),n.data("bs.toast",o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e](this)}}))},r(t,null,[{key:"VERSION",get:function(){return"4.5.3"}},{key:"DefaultType",get:function(){return ge}},{key:"Default",get:function(){return ve}}]),t}();i.default.fn.toast=_e._jQueryInterface,i.default.fn.toast.Constructor=_e,i.default.fn.toast.noConflict=function(){return i.default.fn.toast=me,_e._jQueryInterface},t.Alert=d,t.Button=h,t.Carousel=y,t.Collapse=S,t.Dropdown=Ft,t.Modal=Bt,t.Popover=se,t.Scrollspy=ce,t.Tab=pe,t.Toast=_e,t.Tooltip=te,t.Util=l,Object.defineProperty(t,"__esModule",{value:!0})}));

function Wo_progressIconLoader(e){e.each(function(){return progress_icon_elem=$(this).find("i.progress-icon"),default_icon=progress_icon_elem.attr("data-icon"),hide_back=!1,1==progress_icon_elem.hasClass("hidde")&&(hide_back=!0),1==$(this).find("i.fa-spinner").length?(progress_icon_elem.removeClass("fa-spinner").removeClass("fa-spin").addClass("fa-"+default_icon),1==hide_back&&progress_icon_elem.hide()):progress_icon_elem.removeClass("fa-"+default_icon).addClass("fa-spinner fa-spin").show(),!0})}function Wo_StartBar(){$(".barloading").css("display","block")}function Wo_FinishBar(){$(".barloading").css("display","none")}$(document).ready(function(){$(".nav-footer-toggle").on("click",function(e){e.preventDefault(),$(this).parent().toggleClass("Wide-Footer"),$(".nav-footer-toggle i").toggleClass("fa-arrow-circle-up fa-arrow-circle-down")})});

!function(e){if(!e.hasInitialised){var t={escapeRegExp:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},hasClass:function(e,t){var i=" ";return 1===e.nodeType&&(i+e.className+i).replace(/[\n\t]/g,i).indexOf(i+t+i)>=0},addClass:function(e,t){e.className+=" "+t},removeClass:function(e,t){var i=new RegExp("\\b"+this.escapeRegExp(t)+"\\b");e.className=e.className.replace(i,"")},interpolateString:function(e,t){var i=/{{([a-z][a-z0-9\-_]*)}}/gi;return e.replace(i,function(e){return t(arguments[1])||""})},getCookie:function(e){var t="; "+document.cookie,i=t.split("; "+e+"=");return 2!=i.length?void 0:i.pop().split(";").shift()},setCookie:function(e,t,i,n,o){var s=new Date;s.setDate(s.getDate()+(i||365));var r=[e+"="+t,"expires="+s.toUTCString(),"path="+(o||"/")];n&&r.push("domain="+n),document.cookie=r.join(";")},deepExtend:function(e,t){for(var i in t)t.hasOwnProperty(i)&&(i in e&&this.isPlainObject(e[i])&&this.isPlainObject(t[i])?this.deepExtend(e[i],t[i]):e[i]=t[i]);return e},throttle:function(e,t){var i=!1;return function(){i||(e.apply(this,arguments),i=!0,setTimeout(function(){i=!1},t))}},hash:function(e){var t,i,n,o=0;if(0===e.length)return o;for(t=0,n=e.length;t<n;++t)i=e.charCodeAt(t),o=(o<<5)-o+i,o|=0;return o},normaliseHex:function(e){return"#"==e[0]&&(e=e.substr(1)),3==e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),e},getContrast:function(e){e=this.normaliseHex(e);var t=parseInt(e.substr(0,2),16),i=parseInt(e.substr(2,2),16),n=parseInt(e.substr(4,2),16),o=(299*t+587*i+114*n)/1e3;return o>=128?"#000":"#fff"},getLuminance:function(e){var t=parseInt(this.normaliseHex(e),16),i=38,n=(t>>16)+i,o=(t>>8&255)+i,s=(255&t)+i,r=(16777216+65536*(n<255?n<1?0:n:255)+256*(o<255?o<1?0:o:255)+(s<255?s<1?0:s:255)).toString(16).slice(1);return"#"+r},isMobile:function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},isPlainObject:function(e){return"object"==typeof e&&null!==e&&e.constructor==Object}};e.status={deny:"deny",allow:"allow",dismiss:"dismiss"},e.transitionEnd=function(){var e=document.createElement("div"),t={t:"transitionend",OT:"oTransitionEnd",msT:"MSTransitionEnd",MozT:"transitionend",WebkitT:"webkitTransitionEnd"};for(var i in t)if(t.hasOwnProperty(i)&&"undefined"!=typeof e.style[i+"ransition"])return t[i];return""}(),e.hasTransition=!!e.transitionEnd;var i=Object.keys(e.status).map(t.escapeRegExp);e.customStyles={},e.Popup=function(){function n(){this.initialise.apply(this,arguments)}function o(e){this.openingTimeout=null,t.removeClass(e,"cc-invisible")}function s(t){t.style.display="none",t.removeEventListener(e.transitionEnd,this.afterTransition),this.afterTransition=null}function r(){var t=this.options.onInitialise.bind(this);if(!window.navigator.cookieEnabled)return t(e.status.deny),!0;if(window.CookiesOK||window.navigator.CookiesOK)return t(e.status.allow),!0;var i=Object.keys(e.status),n=this.getStatus(),o=i.indexOf(n)>=0;return o&&t(n),o}function a(){var e=this.options.position.split("-"),t=[];return e.forEach(function(e){t.push("cc-"+e)}),t}function c(){var e=this.options,i="top"==e.position||"bottom"==e.position?"banner":"floating";t.isMobile()&&(i="floating");var n=["cc-"+i,"cc-type-"+e.type,"cc-theme-"+e.theme];e["static"]&&n.push("cc-static"),n.push.apply(n,a.call(this));p.call(this,this.options.palette);return this.customStyleSelector&&n.push(this.customStyleSelector),n}function l(){var e={},i=this.options;i.showLink||(i.elements.link="",i.elements.messagelink=i.elements.message),Object.keys(i.elements).forEach(function(n){e[n]=t.interpolateString(i.elements[n],function(e){var t=i.content[e];return e&&"string"==typeof t&&t.length?t:""})});var n=i.compliance[i.type];n||(n=i.compliance.info),e.compliance=t.interpolateString(n,function(t){return e[t]});var o=i.layouts[i.layout];return o||(o=i.layouts.basic),t.interpolateString(o,function(t){return e[t]})}function u(i){var n=this.options,o=document.createElement("div"),s=n.container&&1===n.container.nodeType?n.container:document.body;o.innerHTML=i;var r=o.children[0];return r.style.display="none",t.hasClass(r,"cc-window")&&e.hasTransition&&t.addClass(r,"cc-invisible"),this.onButtonClick=h.bind(this),r.addEventListener("click",this.onButtonClick),n.autoAttach&&(s.firstChild?s.insertBefore(r,s.firstChild):s.appendChild(r)),r}function h(n){var o=n.target;if(t.hasClass(o,"cc-btn")){var s=o.className.match(new RegExp("\\bcc-("+i.join("|")+")\\b")),r=s&&s[1]||!1;r&&(this.setStatus(r),this.close(!0))}t.hasClass(o,"cc-close")&&(this.setStatus(e.status.dismiss),this.close(!0)),t.hasClass(o,"cc-revoke")&&this.revokeChoice()}function p(e){var i=t.hash(JSON.stringify(e)),n="cc-color-override-"+i,o=t.isPlainObject(e);return this.customStyleSelector=o?n:null,o&&d(i,e,"."+n),o}function d(i,n,o){if(e.customStyles[i])return void++e.customStyles[i].references;var s={},r=n.popup,a=n.button,c=n.highlight;r&&(r.text=r.text?r.text:t.getContrast(r.background),r.link=r.link?r.link:r.text,s[o+".cc-window"]=["color: "+r.text,"background-color: "+r.background],s[o+".cc-revoke"]=["color: "+r.text,"background-color: "+r.background],s[o+" .cc-link,"+o+" .cc-link:active,"+o+" .cc-link:visited"]=["color: "+r.link],a&&(a.text=a.text?a.text:t.getContrast(a.background),a.border=a.border?a.border:"transparent",s[o+" .cc-btn"]=["color: "+a.text,"border-color: "+a.border,"background-color: "+a.background],"transparent"!=a.background&&(s[o+" .cc-btn:hover, "+o+" .cc-btn:focus"]=["background-color: "+v(a.background)]),c?(c.text=c.text?c.text:t.getContrast(c.background),c.border=c.border?c.border:"transparent",s[o+" .cc-highlight .cc-btn:first-child"]=["color: "+c.text,"border-color: "+c.border,"background-color: "+c.background]):s[o+" .cc-highlight .cc-btn:first-child"]=["color: "+r.text]));var l=document.createElement("style");document.head.appendChild(l),e.customStyles[i]={references:1,element:l.sheet};var u=-1;for(var h in s)s.hasOwnProperty(h)&&l.sheet.insertRule(h+"{"+s[h].join(";")+"}",++u)}function v(e){return e=t.normaliseHex(e),"000000"==e?"#222":t.getLuminance(e)}function f(i){if(t.isPlainObject(i)){var n=t.hash(JSON.stringify(i)),o=e.customStyles[n];if(o&&!--o.references){var s=o.element.ownerNode;s&&s.parentNode&&s.parentNode.removeChild(s),e.customStyles[n]=null}}}function m(e,t){for(var i=0,n=e.length;i<n;++i){var o=e[i];if(o instanceof RegExp&&o.test(t)||"string"==typeof o&&o.length&&o===t)return!0}return!1}function b(){var t=this.setStatus.bind(this),i=this.options.dismissOnTimeout;"number"==typeof i&&i>=0&&(this.dismissTimeout=window.setTimeout(function(){t(e.status.dismiss)},Math.floor(i)));var n=this.options.dismissOnScroll;if("number"==typeof n&&n>=0){var o=function(i){window.pageYOffset>Math.floor(n)&&(t(e.status.dismiss),window.removeEventListener("scroll",o),this.onWindowScroll=null)};this.onWindowScroll=o,window.addEventListener("scroll",o)}}function y(){if("info"!=this.options.type&&(this.options.revokable=!0),t.isMobile()&&(this.options.animateRevokable=!1),this.options.revokable){var e=a.call(this);this.options.animateRevokable&&e.push("cc-animate"),this.customStyleSelector&&e.push(this.customStyleSelector);var i=this.options.revokeBtn.replace("{{classes}}",e.join(" "));this.revokeBtn=u.call(this,i);var n=this.revokeBtn;if(this.options.animateRevokable){var o=t.throttle(function(e){var i=!1,o=20,s=window.innerHeight-20;t.hasClass(n,"cc-top")&&e.clientY<o&&(i=!0),t.hasClass(n,"cc-bottom")&&e.clientY>s&&(i=!0),i?t.hasClass(n,"cc-active")||t.addClass(n,"cc-active"):t.hasClass(n,"cc-active")&&t.removeClass(n,"cc-active")},200);this.onMouseMove=o,window.addEventListener("mousemove",o)}}}var g={enabled:!0,container:null,cookie:{name:"cookieconsent_status",path:"/",domain:"",expiryDays:365},onPopupOpen:function(){},onPopupClose:function(){},onInitialise:function(e){},onStatusChange:function(e,t){},onRevokeChoice:function(){},content:{header:"Cookies used on the website!",message:"This website uses cookies to ensure you get the best experience on our website.",dismiss:"Got it!",allow:"Allow cookies",deny:"Decline",link:"Learn more",href:"http://cookiesandyou.com",close:"&#x274c;"},elements:{header:'<span class="cc-header">{{header}}</span>&nbsp;',message:'<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',messagelink:'<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>',dismiss:'<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',allow:'<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',deny:'<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',link:'<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',close:'<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>'},window:'<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',revokeBtn:'<div class="cc-revoke {{classes}}">Cookie Policy</div>',compliance:{info:'<div class="cc-compliance">{{dismiss}}</div>',"opt-in":'<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',"opt-out":'<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>'},type:"info",layouts:{basic:"{{messagelink}}{{compliance}}","basic-close":"{{messagelink}}{{compliance}}{{close}}","basic-header":"{{header}}{{message}}{{link}}{{compliance}}"},layout:"basic",position:"bottom",theme:"block","static":!1,palette:null,revokable:!1,animateRevokable:!0,showLink:!0,dismissOnScroll:!1,dismissOnTimeout:!1,autoOpen:!0,autoAttach:!0,whitelistPage:[],blacklistPage:[],overrideHTML:null};return n.prototype.initialise=function(e){this.options&&this.destroy(),t.deepExtend(this.options={},g),t.isPlainObject(e)&&t.deepExtend(this.options,e),r.call(this)&&(this.options.enabled=!1),m(this.options.blacklistPage,location.pathname)&&(this.options.enabled=!1),m(this.options.whitelistPage,location.pathname)&&(this.options.enabled=!0);var i=this.options.window.replace("{{classes}}",c.call(this).join(" ")).replace("{{children}}",l.call(this)),n=this.options.overrideHTML;if("string"==typeof n&&n.length&&(i=n),this.options["static"]){var o=u.call(this,'<div class="cc-grower">'+i+"</div>");o.style.display="",this.element=o.firstChild,this.element.style.display="none",t.addClass(this.element,"cc-invisible")}else this.element=u.call(this,i);b.call(this),y.call(this),this.options.autoOpen&&this.autoOpen()},n.prototype.destroy=function(){this.onButtonClick&&this.element&&(this.element.removeEventListener("click",this.onButtonClick),this.onButtonClick=null),this.dismissTimeout&&(clearTimeout(this.dismissTimeout),this.dismissTimeout=null),this.onWindowScroll&&(window.removeEventListener("scroll",this.onWindowScroll),this.onWindowScroll=null),this.onMouseMove&&(window.removeEventListener("mousemove",this.onMouseMove),this.onMouseMove=null),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null,this.revokeBtn&&this.revokeBtn.parentNode&&this.revokeBtn.parentNode.removeChild(this.revokeBtn),this.revokeBtn=null,f(this.options.palette),this.options=null},n.prototype.open=function(t){if(this.element)return this.isOpen()||(e.hasTransition?this.fadeIn():this.element.style.display="",this.options.revokable&&this.toggleRevokeButton(),this.options.onPopupOpen.call(this)),this},n.prototype.close=function(t){if(this.element)return this.isOpen()&&(e.hasTransition?this.fadeOut():this.element.style.display="none",t&&this.options.revokable&&this.toggleRevokeButton(!0),this.options.onPopupClose.call(this)),this},n.prototype.fadeIn=function(){var i=this.element;if(e.hasTransition&&i&&(this.afterTransition&&s.call(this,i),t.hasClass(i,"cc-invisible"))){if(i.style.display="",this.options["static"]){var n=this.element.clientHeight;this.element.parentNode.style.maxHeight=n+"px"}var r=20;this.openingTimeout=setTimeout(o.bind(this,i),r)}},n.prototype.fadeOut=function(){var i=this.element;e.hasTransition&&i&&(this.openingTimeout&&(clearTimeout(this.openingTimeout),o.bind(this,i)),t.hasClass(i,"cc-invisible")||(this.options["static"]&&(this.element.parentNode.style.maxHeight=""),this.afterTransition=s.bind(this,i),i.addEventListener(e.transitionEnd,this.afterTransition),t.addClass(i,"cc-invisible")))},n.prototype.isOpen=function(){return this.element&&""==this.element.style.display&&(!e.hasTransition||!t.hasClass(this.element,"cc-invisible"))},n.prototype.toggleRevokeButton=function(e){this.revokeBtn&&(this.revokeBtn.style.display=e?"":"none")},n.prototype.revokeChoice=function(e){this.options.enabled=!0,this.clearStatus(),this.options.onRevokeChoice.call(this),e||this.autoOpen()},n.prototype.hasAnswered=function(t){return Object.keys(e.status).indexOf(this.getStatus())>=0},n.prototype.hasConsented=function(t){var i=this.getStatus();return i==e.status.allow||i==e.status.dismiss},n.prototype.autoOpen=function(e){!this.hasAnswered()&&this.options.enabled&&this.open()},n.prototype.setStatus=function(i){var n=this.options.cookie,o=t.getCookie(n.name),s=Object.keys(e.status).indexOf(o)>=0;Object.keys(e.status).indexOf(i)>=0?(t.setCookie(n.name,i,n.expiryDays,n.domain,n.path),this.options.onStatusChange.call(this,i,s)):this.clearStatus()},n.prototype.getStatus=function(){return t.getCookie(this.options.cookie.name)},n.prototype.clearStatus=function(){var e=this.options.cookie;t.setCookie(e.name,"",-1,e.domain,e.path)},n}(),e.Location=function(){function e(e){t.deepExtend(this.options={},s),t.isPlainObject(e)&&t.deepExtend(this.options,e),this.currentServiceIndex=-1}function i(e,t,i){var n,o=document.createElement("script");o.type="text/"+(e.type||"javascript"),o.src=e.src||e,o.async=!1,o.onreadystatechange=o.onload=function(){var e=o.readyState;clearTimeout(n),t.done||e&&!/loaded|complete/.test(e)||(t.done=!0,t(),o.onreadystatechange=o.onload=null)},document.body.appendChild(o),n=setTimeout(function(){t.done=!0,t(),o.onreadystatechange=o.onload=null},i)}function n(e,t,i,n,o){var s=new(window.XMLHttpRequest||window.ActiveXObject)("MSXML2.XMLHTTP.3.0");if(s.open(n?"POST":"GET",e,1),s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),Array.isArray(o))for(var r=0,a=o.length;r<a;++r){var c=o[r].split(":",2);s.setRequestHeader(c[0].replace(/^\s+|\s+$/g,""),c[1].replace(/^\s+|\s+$/g,""))}"function"==typeof t&&(s.onreadystatechange=function(){s.readyState>3&&t(s)}),s.send(n)}function o(e){return new Error("Error ["+(e.code||"UNKNOWN")+"]: "+e.error)}var s={timeout:5e3,services:["freegeoip","ipinfo","maxmind"],serviceDefinitions:{freegeoip:function(){return{url:"//freegeoip.net/json/?callback={callback}",isScript:!0,callback:function(e,t){try{var i=JSON.parse(t);return i.error?o(i):{code:i.country_code}}catch(n){return o({error:"Invalid response ("+n+")"})}}}},ipinfo:function(){return{url:"//ipinfo.io",headers:["Accept: application/json"],callback:function(e,t){try{var i=JSON.parse(t);return i.error?o(i):{code:i.country}}catch(n){return o({error:"Invalid response ("+n+")"})}}}},ipinfodb:function(e){return{url:"//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",isScript:!0,callback:function(e,t){try{var i=JSON.parse(t);return"ERROR"==i.statusCode?o({error:i.statusMessage}):{code:i.countryCode}}catch(n){return o({error:"Invalid response ("+n+")"})}}}},maxmind:function(){return{url:"//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",isScript:!0,callback:function(e){return window.geoip2?void geoip2.country(function(t){try{e({code:t.country.iso_code})}catch(i){e(o(i))}},function(t){e(o(t))}):void e(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"))}}}}};return e.prototype.getNextService=function(){var e;do e=this.getServiceByIdx(++this.currentServiceIndex);while(this.currentServiceIndex<this.options.services.length&&!e);return e},e.prototype.getServiceByIdx=function(e){var i=this.options.services[e];if("function"==typeof i){var n=i();return n.name&&t.deepExtend(n,this.options.serviceDefinitions[n.name](n)),n}return"string"==typeof i?this.options.serviceDefinitions[i]():t.isPlainObject(i)?this.options.serviceDefinitions[i.name](i):null},e.prototype.locate=function(e,t){var i=this.getNextService();return i?(this.callbackComplete=e,this.callbackError=t,void this.runService(i,this.runNextServiceOnError.bind(this))):void t(new Error("No services to run"))},e.prototype.setupUrl=function(e){var t=this.getCurrentServiceOpts();return e.url.replace(/\{(.*?)\}/g,function(i,n){if("callback"===n){var o="callback"+Date.now();return window[o]=function(t){e.__JSONP_DATA=JSON.stringify(t)},o}if(n in t.interpolateUrl)return t.interpolateUrl[n]})},e.prototype.runService=function(e,t){var o=this;if(e&&e.url&&e.callback){var s=e.isScript?i:n,r=this.setupUrl(e);s(r,function(i){var n=i?i.responseText:"";e.__JSONP_DATA&&(n=e.__JSONP_DATA,delete e.__JSONP_DATA),o.runServiceCallback.call(o,t,e,n)},this.options.timeout,e.data,e.headers)}},e.prototype.runServiceCallback=function(e,t,i){var n=this,o=function(t){s||n.onServiceResult.call(n,e,t)},s=t.callback(o,i);s&&this.onServiceResult.call(this,e,s)},e.prototype.onServiceResult=function(e,t){t instanceof Error||t&&t.error?e.call(this,t,null):e.call(this,null,t)},e.prototype.runNextServiceOnError=function(e,t){if(e){this.logError(e);var i=this.getNextService();i?this.runService(i,this.runNextServiceOnError.bind(this)):this.completeService.call(this,this.callbackError,new Error("All services failed"))}else this.completeService.call(this,this.callbackComplete,t)},e.prototype.getCurrentServiceOpts=function(){var e=this.options.services[this.currentServiceIndex];return"string"==typeof e?{name:e}:"function"==typeof e?e():t.isPlainObject(e)?e:{}},e.prototype.completeService=function(e,t){this.currentServiceIndex=-1,e&&e(t)},e.prototype.logError=function(e){var t=this.currentServiceIndex,i=this.getServiceByIdx(t);console.error("The service["+t+"] ("+i.url+") responded with the following error",e)},e}(),e.Law=function(){function e(e){this.initialise.apply(this,arguments)}var i={regionalLaw:!0,hasLaw:["AT","BE","BG","HR","CZ","CY","DK","EE","FI","FR","DE","EL","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","SK","SI","ES","SE","GB","UK"],revokable:["HR","CY","DK","EE","FR","DE","LV","LT","NL","PT","ES"],explicitAction:["HR","IT","ES"]};return e.prototype.initialise=function(e){t.deepExtend(this.options={},i),t.isPlainObject(e)&&t.deepExtend(this.options,e)},e.prototype.get=function(e){var t=this.options;return{hasLaw:t.hasLaw.indexOf(e)>=0,revokable:t.revokable.indexOf(e)>=0,explicitAction:t.explicitAction.indexOf(e)>=0}},e.prototype.applyLaw=function(e,t){var i=this.get(t);return i.hasLaw||(e.enabled=!1),this.options.regionalLaw&&(i.revokable&&(e.revokable=!0),i.explicitAction&&(e.dismissOnScroll=!1,e.dismissOnTimeout=!1)),e},e}(),e.initialise=function(t,i,n){var o=new e.Law(t.law);i||(i=function(){}),n||(n=function(){}),e.getCountryCode(t,function(n){delete t.law,delete t.location,n.code&&(t=o.applyLaw(t,n.code)),i(new e.Popup(t))},function(i){delete t.law,delete t.location,n(i,new e.Popup(t))})},e.getCountryCode=function(t,i,n){if(t.law&&t.law.countryCode)return void i({code:t.law.countryCode});if(t.location){var o=new e.Location(t.location);return void o.locate(function(e){i(e||{})},n)}i({})},e.utils=t,e.hasInitialised=!0,window.cookieconsent=e}}(window.cookieconsent||{});
/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */!(function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? (module.exports = t(require("jquery"))) : t(jQuery);
})(function (t) {
    "use strict";
    function e(t, e, i) {
        var o;
        return function () {
            var n = this,
                a = arguments,
                s = function () {
                    (o = null), i || t.apply(n, a);
                },
                r = i && !o;
            clearTimeout(o), (o = setTimeout(s, e)), r && t.apply(n, a);
        };
    }
    function i(t) {
        var e = ++h;
        return String(null == t ? "rmjs-" : t) + e;
    }
    function o(t) {
        var e = t.clone().css({ height: "auto", width: t.width(), maxHeight: "none", overflow: "hidden" }).insertAfter(t),
            i = e.outerHeight(),
            o = parseInt(
                e
                    .css({ maxHeight: "" })
                    .css("max-height")
                    .replace(/[^-\d\.]/g, ""),
                10
            ),
            n = t.data("defaultHeight");
        e.remove();
        var a = o || t.data("collapsedHeight") || n;
        t.data({ expandedHeight: i, maxHeight: o, collapsedHeight: a }).css({ maxHeight: "none" });
    }
    function n(t) {
        if (!d[t.selector]) {
            var e = " ";
            t.embedCSS && "" !== t.blockCSS && (e += t.selector + " + [data-readmore-toggle], " + t.selector + "[data-readmore]{" + t.blockCSS + "}"),
                (e += t.selector + "[data-readmore]{transition: height " + t.speed + "ms;overflow: hidden;}"),
                (function (t, e) {
                    var i = t.createElement("style");
                    (i.type = "text/css"), i.styleSheet ? (i.styleSheet.cssText = e) : i.appendChild(t.createTextNode(e)), t.getElementsByTagName("head")[0].appendChild(i);
                })(document, e),
                (d[t.selector] = !0);
        }
    }
    function a(e, i) {
        (this.element = e),
            (this.options = t.extend({}, r, i)),
            n(this.options),
            (this._defaults = r),
            (this._name = s),
            this.init(),
            window.addEventListener ? (window.addEventListener("load", c), window.addEventListener("resize", c)) : (window.attachEvent("load", c), window.attachEvent("resize", c));
    }
    var s = "readmore",
        r = {
            speed: 100,
            collapsedHeight: 200,
            heightMargin: 16,
            moreLink: '<a href="#">Read More</a>',
            lessLink: '<a href="#">Close</a>',
            embedCSS: !0,
            blockCSS: "display: block; width: 100%;",
            startOpen: !1,
            blockProcessed: function () {},
            beforeToggle: function () {},
            afterToggle: function () {},
        },
        d = {},
        h = 0,
        c = e(function () {
        }, 100);
    (a.prototype = {
        init: function () {
            var e = t(this.element);
            e.data({ defaultHeight: this.options.collapsedHeight, heightMargin: this.options.heightMargin }), o(e);
            var n = e.data("collapsedHeight"),
                a = e.data("heightMargin");
            if (e.outerHeight(!0) <= n + a) return this.options.blockProcessed && "function" == typeof this.options.blockProcessed && this.options.blockProcessed(e, !1), !0;
            var s = e.attr("id") || i(),
                r = this.options.startOpen ? this.options.lessLink : this.options.moreLink;
            e.attr({ "data-readmore": "", "aria-expanded": this.options.startOpen, id: s }),
                e.after(
                    t(r)
                        .on(
                            "click",
                            (function (t) {
                                return function (i) {
                                    t.toggle(this, e[0], i);
                                };
                            })(this)
                        )
                        .attr({ "data-readmore-toggle": s, "aria-controls": s })
                ),
                this.options.startOpen || e.css({ height: n }),
                this.options.blockProcessed && "function" == typeof this.options.blockProcessed && this.options.blockProcessed(e, !0);
        },
        toggle: function (e, i, o) {
            o && o.preventDefault(), e || (e = t('[aria-controls="' + this.element.id + '"]')[0]), i || (i = this.element);
            var n = t(i),
                a = "",
                s = "",
                r = !1,
                d = n.data("collapsedHeight");
            n.height() <= d ? ((a = n.data("expandedHeight") + "px"), (s = "lessLink"), (r = !0)) : ((a = d), (s = "moreLink")),
                this.options.beforeToggle && "function" == typeof this.options.beforeToggle && this.options.beforeToggle(e, n, !r),
                n.css({ height: a }),
                n.on(
                    "transitionend",
                    (function (i) {
                        return function () {
                            i.options.afterToggle && "function" == typeof i.options.afterToggle && i.options.afterToggle(e, n, r), t(this).attr({ "aria-expanded": r }).off("transitionend");
                        };
                    })(this)
                ),
                t(e).replaceWith(
                    t(this.options[s])
                        .on(
                            "click",
                            (function (t) {
                                return function (e) {
                                    t.toggle(this, i, e);
                                };
                            })(this)
                        )
                        .attr({ "data-readmore-toggle": n.attr("id"), "aria-controls": n.attr("id") })
                );
        },
        destroy: function () {
            t(this.element).each(function () {
                var e = t(this);
                e.attr({ "data-readmore": null, "aria-expanded": null }).css({ maxHeight: "", height: "" }).next("[data-readmore-toggle]").remove(), e.removeData();
            });
        },
    }),
        (t.fn.readmore = function (e) {
            var i = arguments,
                o = this.selector;
            return (
                (e = e || {}),
                "object" == typeof e
                    ? this.each(function () {
                          if (t.data(this, "plugin_" + s)) {
                              var i = t.data(this, "plugin_" + s);
                              i.destroy.apply(i);
                          }
                          (e.selector = o), t.data(this, "plugin_" + s, new a(this, e));
                      })
                    : "string" == typeof e && "_" !== e[0] && "init" !== e
                    ? this.each(function () {
                          var o = t.data(this, "plugin_" + s);
                          o instanceof a && "function" == typeof o[e] && o[e].apply(o, Array.prototype.slice.call(i, 1));
                      })
                    : void 0
            );
        });
});

/*!
 * In Viewport
 */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],n):n(e.jQuery)}(this,function(e){"use strict";function n(n){var t=this;if(1===arguments.length&&"function"==typeof n&&(n=[n]),!(n instanceof Array))throw new SyntaxError("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions");return n.forEach(function(n){"function"!=typeof n?(console.warn("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions"),console.warn("isInViewport: Ignoring non-function values in array and moving on")):[].slice.call(t).forEach(function(t){return n.call(e(t))})}),this}function t(n){var t=e("<div></div>").css({width:"100%"});n.append(t);var o=n.width()-t.width();return t.remove(),o}function o(n,r){var i=n.getBoundingClientRect(),a=i.top,u=i.bottom,c=i.left,f=i.right,s=e.extend({tolerance:0,viewport:window},r),d=!1,l=s.viewport.jquery?s.viewport:e(s.viewport);l.length||(console.warn("isInViewport: The viewport selector you have provided matches no element on page."),console.warn("isInViewport: Defaulting to viewport as window"),l=e(window));var p=l.height(),w=l.width(),h=l[0].toString();if(l[0]!==window&&"[object Window]"!==h&&"[object DOMWindow]"!==h){var v=l[0].getBoundingClientRect();a-=v.top,u-=v.top,c-=v.left,f-=v.left,o.scrollBarWidth=o.scrollBarWidth||t(l),w-=o.scrollBarWidth}return s.tolerance=~~Math.round(parseFloat(s.tolerance)),s.tolerance<0&&(s.tolerance=p+s.tolerance),f<=0||c>=w?d:d=s.tolerance?a<=s.tolerance&&u>=s.tolerance:u>0&&a<=p}function r(n){if(n){var t=n.split(",");return 1===t.length&&isNaN(t[0])&&(t[1]=t[0],t[0]=void 0),{tolerance:t[0]?t[0].trim():void 0,viewport:t[1]?e(t[1].trim()):void 0}}return{}}e=e&&e.hasOwnProperty("default")?e.default:e,/**
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
e.extend(e.expr.pseudos||e.expr[":"],{"in-viewport":e.expr.createPseudo?e.expr.createPseudo(function(e){return function(n){return o(n,r(e))}}):function(e,n,t){return o(e,r(t[3]))}}),e.fn.isInViewport=function(e){return this.filter(function(n,t){return o(t,e)})},e.fn.run=n});