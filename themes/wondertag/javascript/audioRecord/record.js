jQuery(document).ready(function ($) {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia
      || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;

  }
  catch (e) {
    console.log('There is no support audio in this browser');
  }
  $(document).on('click', "#recordPostAudio", function (event) {
    audio_context = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia();
    }
    Wo_Delay(function () {
      if (localstream && recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean()) {
        Wo_CleanRecordNodes();
        recording_time = $('#postRecordingTime');
        recording_node = "post";
        _SELF.attr('data-record', '1').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg>');
        Wo_startRecording();
      }
      else if (localstream && recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1) {
        Wo_stopRecording();
        _SELF.attr('data-record', '2').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>');    
      }
      else if (localstream && recorder && _SELF.attr('data-record') == 2) {
        Wo_CleanRecordNodes();
        Wo_StopLocalStream();
        _SELF.attr('data-record', '0').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>');    
      }
      else {
        return false;
      }
    }, 500);
  });

  $(document).on('click', ".record-comment-audio", function (event) {
    audio_context = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia();
    }
    Wo_Delay(function () {
      if (recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean()) {
        Wo_CleanRecordNodes();
        recording_time = $("span[data-comment-rtime='" + _SELF.attr('id') + "']");
        recording_node = "comm";
        comm_field     = _SELF.attr('id');
        _SELF.attr('data-record', '1').html('<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.29289 9.29289C9 9.58579 9 10.0572 9 11V13C9 13.9428 9 14.4142 9.29289 14.7071C9.58579 15 10.0572 15 11 15H13C13.9428 15 14.4142 15 14.7071 14.7071C15 14.4142 15 13.9428 15 13V11C15 10.0572 15 9.58579 14.7071 9.29289C14.4142 9 13.9428 9 13 9H11C10.0572 9 9.58579 9 9.29289 9.29289Z" fill="#ff5722" fill-opacity="0.16"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12ZM12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM11 8.25L10.9553 8.25C10.5224 8.24995 10.1256 8.2499 9.80279 8.2933C9.44731 8.34109 9.07159 8.45354 8.76256 8.76256C8.45354 9.07159 8.34109 9.44731 8.2933 9.80279C8.2499 10.1256 8.24995 10.5224 8.25 10.9553L8.25 11V13L8.25 13.0447C8.24995 13.4776 8.2499 13.8744 8.2933 14.1972C8.34109 14.5527 8.45354 14.9284 8.76256 15.2374C9.07159 15.5465 9.44731 15.6589 9.80279 15.7067C10.1256 15.7501 10.5224 15.7501 10.9552 15.75H10.9553L11 15.75H13L13.0447 15.75H13.0448C13.4776 15.7501 13.8744 15.7501 14.1972 15.7067C14.5527 15.6589 14.9284 15.5465 15.2374 15.2374C15.5465 14.9284 15.6589 14.5527 15.7067 14.1972C15.7501 13.8744 15.7501 13.4776 15.75 13.0448V13.0447L15.75 13V11L15.75 10.9553V10.9552C15.7501 10.5224 15.7501 10.1256 15.7067 9.80279C15.6589 9.44731 15.5465 9.07159 15.2374 8.76256C14.9284 8.45354 14.5527 8.34109 14.1972 8.2933C13.8744 8.2499 13.4776 8.24995 13.0447 8.25L13 8.25H11ZM9.82567 9.82186L9.82324 9.82324L9.82186 9.82567C9.82085 9.8276 9.81923 9.83092 9.81716 9.83596C9.8082 9.85774 9.79291 9.90611 9.77992 10.0027C9.75159 10.2134 9.75 10.5074 9.75 11V13C9.75 13.4926 9.75159 13.7866 9.77992 13.9973C9.79291 14.0939 9.8082 14.1423 9.81716 14.164C9.81923 14.1691 9.82085 14.1724 9.82186 14.1743L9.82317 14.1767C9.82277 14.1763 9.8228 14.1763 9.82307 14.1766L9.82283 14.1765L9.82317 14.1767L9.8232 14.1768L9.82359 14.1771C9.8236 14.1771 9.82353 14.1771 9.8234 14.1769C9.82335 14.1769 9.82329 14.1768 9.82322 14.1768L9.82317 14.1767L9.82324 14.1768L9.82567 14.1781C9.8276 14.1791 9.83092 14.1808 9.83596 14.1828C9.85774 14.1918 9.90611 14.2071 10.0027 14.2201C10.2134 14.2484 10.5074 14.25 11 14.25H13C13.4926 14.25 13.7866 14.2484 13.9973 14.2201C14.0939 14.2071 14.1423 14.1918 14.164 14.1828C14.1691 14.1808 14.1724 14.1791 14.1743 14.1781L14.1768 14.1768L14.1781 14.1743C14.1791 14.1724 14.1808 14.1691 14.1828 14.164C14.1918 14.1423 14.2071 14.0939 14.2201 13.9973C14.2484 13.7866 14.25 13.4926 14.25 13V11C14.25 10.5074 14.2484 10.2134 14.2201 10.0027C14.2071 9.90611 14.1918 9.85774 14.1828 9.83596C14.1808 9.83092 14.1791 9.8276 14.1781 9.82567L14.1768 9.82324L14.1743 9.82186C14.1724 9.82085 14.1691 9.81923 14.164 9.81716C14.1423 9.8082 14.0939 9.79291 13.9973 9.77992C13.7866 9.75159 13.4926 9.75 13 9.75H11C10.5074 9.75 10.2134 9.75159 10.0027 9.77992C9.90611 9.79291 9.85774 9.8082 9.83596 9.81716C9.83092 9.81923 9.8276 9.82085 9.82567 9.82186Z" fill="#ff5722"></path></svg>');  
        Wo_startRecording();
      }

      else if (recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1) {
       Wo_stopRecording();
       _SELF.html('<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.62661 15.3991L5 6H19L18.3734 15.3991C18.1964 18.054 18.1079 19.3815 17.2429 20.1907C16.3779 21 15.0475 21 12.3867 21H11.6133C8.95252 21 7.62212 21 6.75711 20.1907C5.8921 19.3815 5.8036 18.054 5.62661 15.3991Z" fill="red" fill-opacity="0.16"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.4062 2.25L10.4415 2.25H13.5585L13.5938 2.25C13.9112 2.24996 14.2092 2.24992 14.459 2.27844C14.7371 2.31019 15.0296 2.38361 15.3025 2.58033C15.5754 2.77704 15.7375 3.03124 15.8556 3.28508C15.9616 3.51299 16.0559 3.79574 16.1562 4.09685L16.1562 4.09687L16.1562 4.0969L16.1674 4.13037L16.5406 5.25H19H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H19.7017L19.1217 15.449L19.1182 15.5016C19.0327 16.7844 18.9637 17.8205 18.8017 18.6336C18.6333 19.4789 18.3469 20.185 17.7553 20.7384C17.1637 21.2919 16.4401 21.5307 15.5855 21.6425C14.7634 21.75 13.725 21.75 12.4394 21.75H12.3867H11.6133H11.5606C10.275 21.75 9.23655 21.75 8.41451 21.6425C7.55986 21.5307 6.83631 21.2919 6.24472 20.7384C5.65312 20.185 5.3667 19.4789 5.19831 18.6336C5.03633 17.8205 4.96727 16.7844 4.88178 15.5016L4.87827 15.449L4.29834 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H5H7.45943L7.83264 4.13037L7.8438 4.09688L7.84381 4.09686C7.94414 3.79575 8.03835 3.51299 8.14438 3.28508C8.26246 3.03124 8.42459 2.77704 8.69752 2.58033C8.97045 2.38361 9.26287 2.31019 9.54102 2.27844C9.79077 2.24992 10.0888 2.24996 10.4062 2.25ZM9.04057 5.25H14.9594L14.7443 4.60472C14.6289 4.25832 14.5611 4.05863 14.4956 3.91778C14.466 3.85423 14.4457 3.82281 14.4348 3.80824C14.4298 3.80149 14.427 3.79862 14.4264 3.79801L14.4254 3.79719L14.4243 3.79654C14.4236 3.79616 14.42 3.79439 14.412 3.79174C14.3947 3.78604 14.3585 3.7767 14.2888 3.76875C14.1345 3.75113 13.9236 3.75 13.5585 3.75H10.4415C10.0764 3.75 9.86551 3.75113 9.71117 3.76875C9.64154 3.7767 9.60531 3.78604 9.58804 3.79174C9.58005 3.79439 9.57643 3.79616 9.57566 3.79654L9.57458 3.79719L9.57363 3.79801C9.57302 3.79862 9.57019 3.80149 9.56516 3.80824C9.55428 3.82281 9.53397 3.85423 9.50441 3.91778C9.43889 4.05863 9.37113 4.25832 9.25566 4.60472L9.04057 5.25ZM5.80166 6.75L6.37495 15.3492C6.4648 16.6971 6.52883 17.6349 6.6694 18.3405C6.80575 19.025 6.99608 19.3873 7.2695 19.6431C7.54291 19.8988 7.91707 20.0647 8.60907 20.1552C9.32247 20.2485 10.2625 20.25 11.6133 20.25H12.3867C13.7375 20.25 14.6775 20.2485 15.3909 20.1552C16.0829 20.0647 16.4571 19.8988 16.7305 19.6431C17.0039 19.3873 17.1943 19.025 17.3306 18.3405C17.4712 17.6349 17.5352 16.6971 17.6251 15.3492L18.1983 6.75H16H8H5.80166ZM10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V10C9.25 9.58579 9.58579 9.25 10 9.25ZM14.75 10C14.75 9.58579 14.4142 9.25 14 9.25C13.5858 9.25 13.25 9.58579 13.25 10V14C13.25 14.4142 13.5858 14.75 14 14.75C14.4142 14.75 14.75 14.4142 14.75 14V10Z" fill="red"/></svg>').attr('data-record', '2');     
      }

      else if (recorder && _SELF.attr('data-record') == 2) {
       Wo_CleanRecordNodes();
       Wo_StopLocalStream();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><rect x="9" y="2" width="6" height="13" rx="3" fill="currentColor" fill-opacity="0.16"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C9.92893 1.25 8.25 2.92893 8.25 5V12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12V5C15.75 2.92893 14.0711 1.25 12 1.25ZM9.75 5C9.75 3.75736 10.7574 2.75 12 2.75C13.2426 2.75 14.25 3.75736 14.25 5V12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12V5ZM5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 14.7248 5.35083 16.6879 6.90007 17.9555C8.19962 19.0187 9.78803 19.5726 11.25 19.7135V22C11.25 22.4142 11.5858 22.75 12 22.75C12.4142 22.75 12.75 22.4142 12.75 22V19.7135C14.212 19.5726 15.8004 19.0187 17.0999 17.9555C18.6492 16.6879 19.75 14.7248 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12C18.25 14.2752 17.3508 15.8121 16.1501 16.7945C14.9259 17.7961 13.3499 18.25 12 18.25C10.6501 18.25 9.07409 17.7961 7.84993 16.7945C6.64917 15.8121 5.75 14.2752 5.75 12Z" fill="currentColor"/></svg>').attr('data-record', '0');  
      }

      else {
        return false;
      }
    }, 500);
    
  });

  $(document).on('click', ".record-chat-audio", function (event) {
    audio_context          = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia(); 
    }
    Wo_Delay(function () {
      if (recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean() && $("[data-record='1']").length == 0) {
        Wo_CleanRecordNodes();
        recording_time = $("span[data-chat-rtime='" + _SELF.attr('data-chat-tab') + "']");
        recording_node = "chat";
        chat_tab       = _SELF.attr('data-chat-tab');
        _SELF.attr('data-record', '1').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M12,22A10,10,0,1,1,22,12,10.01146,10.01146,0,0,1,12,22Z" opacity=".5" fill="#f44336"></path><path d="M15,16H9a.99974.99974,0,0,1-1-1V9A.99974.99974,0,0,1,9,8h6a.99974.99974,0,0,1,1,1v6A.99974.99974,0,0,1,15,16Z" fill="#f44336"></path></svg>');  
        Wo_startRecording();
      }

      else if (recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1) {
       Wo_stopRecording();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M13.41406,12l3.293-3.293A.99989.99989,0,0,0,15.293,7.293L12,10.58594,8.707,7.293A.99989.99989,0,0,0,7.293,8.707L10.58594,12,7.293,15.293A.99989.99989,0,0,0,8.707,16.707L12,13.41406l3.293,3.293A.99989.99989,0,0,0,16.707,15.293Z" fill="#f44336"></path><path opacity=".5" d="M19.0708,4.9292A9.99962,9.99962,0,1,0,4.9292,19.0708,9.99962,9.99962,0,1,0,19.0708,4.9292ZM16.707,15.293A.99989.99989,0,1,1,15.293,16.707L12,13.41406,8.707,16.707A.99989.99989,0,0,1,7.293,15.293L10.58594,12,7.293,8.707A.99989.99989,0,0,1,8.707,7.293L12,10.58594l3.293-3.293A.99989.99989,0,0,1,16.707,8.707L13.41406,12Z" fill="#f44336"></path></svg>').attr('data-record', '2');
      }

      else if (recorder && _SELF.attr('data-record') == 2) {
       Wo_CleanRecordNodes();
       Wo_StopLocalStream();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record', '0');
      }

      else {
        return false;
      }
	  if (_SELF.parents('form').length > 0 && _SELF.parents('form').find('#color').length > 0) {
        _SELF.find('[fill]').attr('fill', _SELF.parents('form').find('#color').val());
      }
    }, 500);
    
  });

  $(document).on('click', "#messages-record", function (event) {
    audio_context = new AudioContext;
    var _SELF = $(this);
    if (!localstream) {
      Wo_CreateUserMedia();
    }
    Wo_Delay(function () {
      if (recorder && _SELF.attr('data-record') == 0 && Wo_IsRecordingBufferClean() && $("[data-record='1']").length == 0) {
        Wo_CleanRecordNodes();
        recording_time = $("span.messages-rtime");
        recording_node = "msg";
        _SELF.attr('data-record', '1').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M12,22A10,10,0,1,1,22,12,10.01146,10.01146,0,0,1,12,22Z" opacity=".5" fill="#f44336"></path><path d="M15,16H9a.99974.99974,0,0,1-1-1V9A.99974.99974,0,0,1,9,8h6a.99974.99974,0,0,1,1,1v6A.99974.99974,0,0,1,15,16Z" fill="#f44336"></path></svg>');  
        Wo_startRecording();
      }

      else if (recorder && _SELF.attr('data-record') == 1 && $("[data-record='1']").length == 1) {
       Wo_stopRecording();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><path d="M13.41406,12l3.293-3.293A.99989.99989,0,0,0,15.293,7.293L12,10.58594,8.707,7.293A.99989.99989,0,0,0,7.293,8.707L10.58594,12,7.293,15.293A.99989.99989,0,0,0,8.707,16.707L12,13.41406l3.293,3.293A.99989.99989,0,0,0,16.707,15.293Z" fill="#f44336"></path><path opacity=".5" d="M19.0708,4.9292A9.99962,9.99962,0,1,0,4.9292,19.0708,9.99962,9.99962,0,1,0,19.0708,4.9292ZM16.707,15.293A.99989.99989,0,1,1,15.293,16.707L12,13.41406,8.707,16.707A.99989.99989,0,0,1,7.293,15.293L10.58594,12,7.293,8.707A.99989.99989,0,0,1,8.707,7.293L12,10.58594l3.293-3.293A.99989.99989,0,0,1,16.707,8.707L13.41406,12Z" fill="#f44336"></path></svg>').attr('data-record', '2');
      }

      else if (recorder && _SELF.attr('data-record') == 2) {
       Wo_CleanRecordNodes();
       Wo_StopLocalStream();
       _SELF.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record','0').attr('data-record', '0');  
      }

      else {
        return false;
      }
    }, 500);
    
  });
});

function Wo_IsRecordingBufferClean() {
  return $("[data-record='1']").length == 0; 
}

function Wo_CreateUserMedia() {
  navigator.getUserMedia({ audio: true }, Wo_startUserMedia, function (e) {
    console.log('Could not get input or something went wrong: ' + e);
  });
}
function Wo_CleanRecordNodes(color = "#cf8283") {
  $(".record-comment-audio").each(function (index, el) {
    $(el).html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><rect x="9" y="2" width="6" height="13" rx="3" fill="currentColor" fill-opacity="0.16"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C9.92893 1.25 8.25 2.92893 8.25 5V12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12V5C15.75 2.92893 14.0711 1.25 12 1.25ZM9.75 5C9.75 3.75736 10.7574 2.75 12 2.75C13.2426 2.75 14.25 3.75736 14.25 5V12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12V5ZM5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 14.7248 5.35083 16.6879 6.90007 17.9555C8.19962 19.0187 9.78803 19.5726 11.25 19.7135V22C11.25 22.4142 11.5858 22.75 12 22.75C12.4142 22.75 12.75 22.4142 12.75 22V19.7135C14.212 19.5726 15.8004 19.0187 17.0999 17.9555C18.6492 16.6879 19.75 14.7248 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12C18.25 14.2752 17.3508 15.8121 16.1501 16.7945C14.9259 17.7961 13.3499 18.25 12 18.25C10.6501 18.25 9.07409 17.7961 7.84993 16.7945C6.64917 15.8121 5.75 14.2752 5.75 12Z" fill="currentColor"/></svg>').attr('data-record', '0');
	$('[data-comment-rtime="' + $(el).attr('id') + '"]').text('00:00').addClass('hidden');
  });

  $(".record-chat-audio").each(function (index, el) {
    $(el).html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="'+color+'" rx="4"></rect><path fill="'+color+'" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record', '0');
	$('[data-chat-rtime="' + $(el).attr('data-chat-tab') + '"]').text('00:00').addClass('hidden');
  });

  recorder && recorder.clear();
  recorder && clearTimeout(wo_timeout);
  Wo_clearPRecording();
  Wo_clearMRecording();
}

function Wo_ClearTimeout() {
  clearTimeout(wo_timeout);
}
function Wo_ShowRecordingTime(self) {
  var time = self.text();
  var seconds = time.split(":");
  var date = new Date();
  date.setHours(0);
  date.setMinutes(seconds[0]);
  date.setSeconds(seconds[1]);
  var __date = new Date(date.valueOf() + 1000);
  var temp = __date.toTimeString().split(" ");
  var timeST = temp[0].split(":");
  if (timeST[1] >= 10) {
    Wo_ClearTimeout();
    Wo_stopRecording();
  }
  else {
	self.text(timeST[1] + ":" + timeST[2]);
    wo_timeout = setTimeout(Wo_ShowRecordingTime, 1000, recording_time)  
  }

}
var audio_context, recorder, recording_time, wo_timeout, localstream, recording_node, chat_tab, comm_field;
function Wo_startUserMedia(stream) {
  localstream = stream;
  var input = audio_context.createMediaStreamSource(stream);
  if (input) {
    recorder = new Recorder(input, { bufferLen: 16384 });
  }
  else {
    console.log('Could not initialize media stream');
  }
}

function Wo_startRecording() {
  recorder && recorder.record();
  recording_time.removeClass('hidden');
  recorder && recorder.exportWAV(function (blob) { });
  recorder && setTimeout(Wo_ShowRecordingTime, 1000, recording_time);
  //console.log('recording started');
}

function Wo_stopRecording() {
  recorder && recorder.stop();
  wo_timeout && clearTimeout(wo_timeout);
  //recorder     && console.log('recording sotopped');
}

function Wo_StopLocalStream() {
  localstream && localstream.getTracks().forEach(function (track) { track.stop() });
  localstream = false;
  recording_node = false;
  delete (recorder);
}

function Wo_clearPRecording() {
  recorder && recorder.clear();
  recording_time && recording_time.text('00:00');
  recorder && clearTimeout(wo_timeout);
  recording_time && recording_time.addClass('hidden');
  $("#recordPostAudio").attr('data-record', '0').find('b').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>');
}

function Wo_clearMRecording() {
  recorder && recorder.clear();
  recording_time && recording_time.text('00:00');
  recorder && clearTimeout(wo_timeout);
  recording_time && recording_time.addClass('hidden');
  $("#messages-record").html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21"><rect width="8" height="14.1" x="8" y=".95" opacity=".5" fill="currentColor" rx="4"></rect><path fill="currentColor" d="M20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.007,8.007,0,0,0,7,7.93054V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93054A8.007,8.007,0,0,0,20,11Z"></path></svg>').attr('data-record', '0');
}

function Wo_GetPRecordLink() {
  var publisher_button = $('#publisher-button');
  publisher_button.attr('disabled', true);
  if (recorder && recording_node == "post") {
    recorder.exportWAV(function(blob) {
      if (blob instanceof Blob && blob.size > 50) {
        var fileName = (new Date).toISOString().replace(/:|\./g, '-');
        var file = new File([blob], 'wo-' + fileName + '.wav', { type: 'audio/wav' });
        var dataForm = new FormData();
        dataForm.append('audio-filename', file.name);
        dataForm.append('audio-blob', file);
        Wo_RegisterPost(dataForm);
      }
      else { $('form.publisher-box').submit() }
    });
  }
  else { $('form.publisher-box').submit() }
}

function Wo_GetMRecordLink() {
  if (recorder && recording_node == "msg") {
    recorder.exportWAV(function (blob) {
      if (blob instanceof Blob && blob.size > 50) {
        var fileName = (new Date).toISOString().replace(/:|\./g, '-');
        var file = new File([blob], 'AU-' + fileName + '.wav', { type: 'audio/wav' });
        var dataForm = new FormData();
        dataForm.append('audio-filename', file.name);
        dataForm.append('audio-blob', file);
        Wo_RegisterMessage(dataForm);
      }
      else { $('form.sendMessages').submit() }

    });
  }
  else { $('form.sendMessages').submit() }
}

function Wo_RegisterTabMessage(id, type = '') {

  if (!id) {
    return false;
  }

  if (type == 'page') {
    chat_tab = id;
  }
  
  if (recorder && recording_node == "chat" && id == chat_tab) {
    recorder.exportWAV(function (blob) {
      if (blob instanceof Blob && blob.size > 50) {
        var fileName = (new Date).toISOString().replace(/:|\./g, '-');
        var file = new File([blob], 'AU-' + fileName + '.wav', { type: 'audio/wav' });
        var dataForm = new FormData();
        dataForm.append('audio-filename', file.name);
        dataForm.append('audio-blob', file);
        Wo_RegisterTabMessageRecord(dataForm, id, type);
      }
      else {
        if (type == 'page') {
		  $('form.page-chat-sending-' + id).submit();
        }
        else {
		  $('form.chat-sending-form-' + id).submit();
        }
      }

    });
  }
  else {
    if (type == 'page') {
	  $('form.page-chat-sending-' + id).submit();
    }
    else {
	  $('form.chat-sending-form-' + id).submit();
    }
  }
}

function Wo_RegisterTabMessageRecord(dataForm, id, type = '') {
  if (dataForm && id) {
    var form_class = 'chat-sending-form-';
    if (type == 'page') {
      form_class = 'page-chat-sending-';
    }
    //$('form.'+form_class+id).find('.ball-pulse').fadeIn(100);
    $.ajax({
        url: Wo_Ajax_Requests_File() + "?f=chat&s=register_message_record",
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: dataForm,
        processData: false,
        contentType: false,
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = (evt.loaded / evt.total) * 100;
                }
           }, false);
           return xhr;
        }
    }).done(function(data) {
      if (data.status == 200) {
        $('form.' + form_class + id).find('input.message-record').val('');   
        $('form.' + form_class + id).find('input.media-name').val('');
        //$('form.'+form_class+id).find('.ball-pulse').fadeOut(100);;
        Wo_stopRecording();
		var color = '';
        if ($('form.' + form_class + id).find('#color').length > 0) {
          color = $('form.' + form_class + id).find('#color').val();
        }
        Wo_CleanRecordNodes(color);
        Wo_StopLocalStream();
        $('form.' + form_class + id).find('input.message-record').val(data.url);
        $('form.' + form_class + id).find('input.media-name').val(data.name);
		var color = $('.chat-sending-form-' + id + ' #color').val();
        if (node_socket_flow === "1") {
          socket.emit("private_message", {
            to_id: id,
            from_id: _getCookie("user_id"),
            msg: "",
            color: color,
            mediaFilename: data.url,
            mediaName: data.name,
            record: true
          })
        }
        else {
          $('form.' + form_class + id).submit();
        }
        console.log("Done")
      }
    });
  }
}

function Wo_RegisterPost(dataForm) {
  if (dataForm) {
    $.ajax({
      url: Wo_Ajax_Requests_File() + "?f=posts&s=register_post_record",
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: dataForm,
      processData: false,
      contentType: false,
    }).done(function (data) {
      if (data.status == 200) {
        Wo_stopRecording();
        Wo_clearPRecording();
        Wo_StopLocalStream();
        $("#postRecord").val(data.url)
        $('form.publisher-box').submit()
      }
    });
  }
}

function Wo_RegisterMessage(dataForm) {
  if (dataForm) {
    $.ajax({
      url: Wo_Ajax_Requests_File() + "?f=messages&s=upload_record",
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: dataForm,
      processData: false,
      contentType: false,
    }).done(function (data) {
      if (data.status == 200) {
        Wo_stopRecording();
        Wo_clearMRecording();
        Wo_StopLocalStream();
        $("#message-record-file").val(data.url);
        $("#message-record-name").val(data.name);
        if (node_socket_flow === "1") {
          socket.emit("private_message_page", {
            to_id: $("#users-message.active").find(".messages-recipients-list").attr("id").substr("messages-recipient-".length),
            from_id: _getCookie("user_id"),
            msg: "",
            color: $(".send-button").css("background-color"),
            mediaFilename: data.url,
            mediaName: data.name,
            record: true,
            isSticker: false
          })
        } else {
          $('form.sendMessages').submit();
        }
        console.log("Done")
      }
    });
  }
}

function Wo_RegisterComment(text, post_id, user_id, event, page_id, type,gif_url = '') {
	$('.chat-box-stickers-cont').html('');
	$('#gif-form-'+post_id).slideUp(200);
  if (!text) {
    text = $('[id=post-' + post_id + ']').find('.comment-textarea').val();
  }
  
  
  if (event.keyCode == 13 && event.shiftKey == 0 && recording_node == "comm") {
    Wo_stopRecording(); 
    if (recorder) { 
      recorder.exportWAV(function (blob){
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id', post_id);
        dataForm.append('text', text);
        dataForm.append('user_id', user_id);
        dataForm.append('page_id', page_id);
        dataForm.append('comment_image', comment_image);
		dataForm.append('gif_url', gif_url);
        if (blob.size > 50) {
          var fileName = (new Date).toISOString().replace(/:|\./g, '-');
          var file = new File([blob], 'wo-' + fileName + '.wav', { type: 'audio/wav' });
          dataForm.append('audio-filename', file.name);
          dataForm.append('audio-blob', file);
        }
        Wo_InsertComment(dataForm, post_id);
      });
    }

    else {
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id', post_id);
        dataForm.append('text', text);
        dataForm.append('user_id', user_id);
        dataForm.append('page_id', page_id);
        dataForm.append('comment_image', comment_image);
		dataForm.append('gif_url', gif_url);
        $('#charsLeft_' + post_id).text($('#charsLeft_' + post_id).attr('data_num')); 
        Wo_InsertComment(dataForm, post_id);
    }
  }
}

function Wo_RegisterComment2(post_id, user_id, page_id, type,gif_url = '') {
	$('.chat-box-stickers-cont').html('');
  $('#gif-form-'+post_id).slideUp(200);
  text = $('[id=post-' + post_id + ']').find('.comment-textarea').val();
  //if (recording_node == "comm") {
    Wo_stopRecording(); 
    if (recorder) { 
      recorder.exportWAV(function (blob) {
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id', post_id);
        dataForm.append('text', text);
        dataForm.append('user_id', user_id);
        dataForm.append('page_id', page_id);
        dataForm.append('comment_image', comment_image);
		dataForm.append('gif_url', gif_url);
        if (blob.size > 50) {
          var fileName = (new Date).toISOString().replace(/:|\./g, '-');
          var file = new File([blob], 'wo-' + fileName + '.wav', { type: 'audio/wav' });
          dataForm.append('audio-filename', file.name);
          dataForm.append('audio-blob', file);
        }
        Wo_InsertComment(dataForm, post_id);
      });
    }

    else {
        var comment_src_image = $('#post-' + post_id).find('#comment_src_image');
        var comment_image = '';
        if (comment_src_image.length > 0) {
          comment_image = comment_src_image.val();
        }       
        var dataForm = new FormData();                    
        dataForm.append('post_id', post_id);
        dataForm.append('text', text);
        dataForm.append('user_id', user_id);
        dataForm.append('page_id', page_id);
        dataForm.append('comment_image', comment_image);
		dataForm.append('gif_url', gif_url);
        $('#charsLeft_' + post_id).text($('#charsLeft_' + post_id).attr('data_num'));
        Wo_InsertComment(dataForm, post_id);
    }
  //}
}

function Wo_RegisterComment3(post_id, user_id, page_id, type) {
	text = $('[id=post-' + post_id + ']').find('.lightbox-comment-textarea').val();
	if (recording_node == "comm") {
		Wo_stopRecording(); 
        var comment_image = '';    
        var dataForm = new FormData();                    
        dataForm.append('post_id', post_id);
        dataForm.append('text', text);
        dataForm.append('user_id', user_id);
        dataForm.append('page_id', page_id);
        dataForm.append('comment_image', comment_image);
        Wo_InsertComment(dataForm, post_id);
	}
}

function Wo_InsertComment(dataForm, post_id){
    if (!dataForm) { return false; }
    post_wrapper = $('[id=post-' + post_id + ']');
    comment_textarea = post_wrapper.find('.post-comments');
    comment_btn = comment_textarea.find('.emo-comment');
    textarea_wrapper = comment_textarea.find('.textarea');
    comment_list = post_wrapper.find('.comments-list');
    //event.preventDefault();
    textarea_wrapper.val('').css("cssText", "height: 36px;");
	$('.wo_comment_combo_' + post_id).removeClass('comment-toggle');
	
    comment_textarea.find('.msg_progress').show();
    $.ajax({
        url: Wo_Ajax_Requests_File() + '?f=posts&s=register_comment&hash=' + $('.main_session').val(),
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: dataForm,
        processData: false,
        contentType: false,
    }).done(function (data) {
      if (data.status == 200) {
		  if (node_socket_flow == "1") {
        socket.emit("post_notification", { post_id: post_id, user_id: _getCookie("user_id"), type: "added" });
      }
        Wo_CleanRecordNodes();
        post_wrapper.find('.post-footer .comment-container:last-child').after(data.html);
        post_wrapper.find('.comments-list-lightbox .comment-container:first').before(data.html);
		if (post_wrapper.find('.tag_hid_e_com').hasClass("d-none")) {
			post_wrapper.find('.tag_hid_e_com').removeClass("d-none");
		}
        post_wrapper.find('[id=comments]').html(data.comments_num);
        post_wrapper.find('.lightbox-no-comments').remove();
        Wo_StopLocalStream();
		if (data.mention.length > 0 && node_socket_flow == "1") {
        $.each(data.mention, function( index, value ) {
          socket.emit("user_notification", { to_id: value, user_id: _getCookie("user_id")});
        });
      }
      }
      $('#post-' + post_id).find('.comment-image-con').empty().addClass('hidden');
      $('#post-' + post_id).find('#comment_src_image').val('');
      comment_textarea.find('.msg_progress').hide();
      if (data.can_send == 1) {
        Wo_SendMessages();
      }
    });
}