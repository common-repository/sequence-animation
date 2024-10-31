function spfa_isScrolledIntoView(elem){
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();

    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

jQuery(document).ready(function() {
  //check for initial visibilitys
  spfa_ajax_params.init_hidden_elements.forEach(function(element) {
    var temp_dis=jQuery(element.selector).css('display');
    jQuery(element.selector).css('display','none');
    jQuery(element.selector).css('opacity','0');
    setTimeout(function(){
      jQuery(element.selector).css('display',temp_dis);
    },100)  
  });
  // global var for selector
  var spfa_temp_selector = null;
  // global var for trigger selector
  var spfa_temp_trigger_selector = null;
  //global var for opacity memory
  var spfa_temp_opacity = null;
  //clear local storage
  spfa_clear_local_storage();
  //declare play flag array
  window.spfa_flag_mouse_once = new Array();
  //declare array for scale compensate function
  window.spfa_compansate_array = new Array();
  //declare array for element hover flag
  window.spfa_hover_flag_array = new Array();
  //declare array transform css animations
  window.spfa_transform_array = new Array();
  //
  spfa_upload_selectors();
  // get css selector on click using selector.js
  my_selector_generator = new CssSelectorGenerator;
  //test var 
  window.spfa_test_var = 0;
  // open instruction label
  jQuery("li#wp-admin-bar-fa_animation .ab-item").click(function(e) {
    spfa_generate_instruction_box('off');
  });

  // highlight at mouseover
  prevElement = null;
  document.addEventListener('mousemove',
      function(e){
        //select element
        if(jQuery('#spfa_instruction_box').length  && !(jQuery('#spfa_j_dialog').length) && !(e.target.id == "spfa_tabs_div") && !(jQuery(e.target).parents("#spfa_tabs_div").length) && !(e.target.id == "wpadminbar") && !(jQuery(e.target).parents("#wpadminbar").length) ){
          var elem = e.target || e.srcElement;
          var selector = my_selector_generator.getSelector(elem);
          // opacity (case it changes)
          spfa_temp_opacity = elem.style.opacity;
          if (spfa_temp_opacity == ''){
            spfa_temp_opacity='1';
          }
          if (prevElement!= null) {
            prevElement.classList.remove("spfa_mouseOn");
          }

          if(elem.classList ){
            elem.classList.add("spfa_mouseOn");
            prevElement = elem; 
          }
        }  

        //select trigger element
        if(jQuery('#spfa_trigger_instruction_box').length  && !(jQuery('#spfa_j_dialog').length) && !(e.target.id == "spfa_tabs_div") && !(jQuery(e.target).parents("#spfa_tabs_div").length) && !(e.target.id == "wpadminbar") && !(jQuery(e.target).parents("#wpadminbar").length) ){
          var elem = e.target || e.srcElement;
          var selector = my_selector_generator.getSelector(elem);

          if (prevElement!= null) {
            prevElement.classList.remove("spfa_trigger_mouseOn");
          }
          if(elem.classList ){
            elem.classList.add("spfa_trigger_mouseOn");
            prevElement = elem; 
          }
        }  
      },true);

  // open editor box with unique css selector
  jQuery("body").click(function(e) {
    //condition for avoiding reopen box on inside box click
    if ((( jQuery( "#spfa_instruction_box" ).length ))&&( !jQuery( "#spfa_trigger_instruction_box" ).length )&& !(e.target.id == 'spfa_instruction_box_close_button') && !(e.target.id == 'spfa_instruction_box') && !(e.target.id == "spfa_instruction_box_text") && !(e.target.id == "spfa_tabs_div" || jQuery(e.target).parents("#spfa_tabs_div").length || jQuery('#spfa_j_dialog').dialog('isOpen') === true)) {
      // get reference to the element user clicked on
      var element = event.target;
      //disable link 
      e.preventDefault();
      //remove mouse.on class from highlight
      jQuery(element).removeClass("spfa_mouseOn");
      jQuery(element).parent().removeClass( "ui-effects-wrapper" );
      // get unique CSS selector for that element
      var selector = my_selector_generator.getSelector(element);
      spfa_temp_selector = my_selector_generator.getSelector(element);
      classInstance = new spfa_anim_editor(selector);
      //check queue
      if (jQuery(element).queue().length>0){
        return;
      }
      //call the function and passing the arguments
      classInstance.generate_box(classInstance.browser_localstorage('get'),e.pageX,e.pageY);
      classInstance.init_tab();
      //create tooltips
      spfa_create_tooltips()
      //set opacity from memory (case third script has change it on mouse over)
      //get the args
      var args = JSON.parse(localStorage.getItem(spfa_temp_selector));
      args.init_opacity = spfa_temp_opacity;
      localStorage.setItem(spfa_temp_selector, JSON.stringify(args));
    } 

    //for setting trigger element
    if ((( jQuery( "#spfa_trigger_instruction_box" ).length ))&& !(e.target.id == 'spfa_instruction_box_trigger_close_button') && !(e.target.id == 'spfa_trigger_instruction_box') && !(e.target.id == 'spfa_trigger_instruction_box_text') && !(e.target.id == "spfa_tabs_div" || jQuery(e.target).parents("#spfa_tabs_div").length || jQuery('#spfa_j_dialog').dialog('isOpen') === true)) {
      // get reference to the element user clicked on
      var trigger_element = event.target;
      //disable link 
      e.preventDefault();
      //remove mouse.on class from highlight
      jQuery(trigger_element).removeClass("spfa_trigger_mouseOn");
      jQuery(trigger_element).parent().removeClass( "ui-effects-wrapper" );
      // get unique CSS selector for that element
      if (spfa_temp_selector){
        var trigger_selector = my_selector_generator.getSelector(trigger_element);
        spfa_temp_trigger_selector = trigger_selector;
        //get the args
        var args = JSON.parse(localStorage.getItem(spfa_temp_selector));
        //set trigger item
        args.trigger_item = spfa_temp_trigger_selector;
        // Put the object into storage
        localStorage.setItem(spfa_temp_selector, JSON.stringify(args));
        jQuery('#spfa_trigger_selector_text').val(spfa_temp_trigger_selector);
      }
      else{
        alert('no element selected');
      }
      jQuery( "#spfa_trigger_instruction_box").remove();
      jQuery("body *").children().removeClass("spfa_trigger_mouseOn");
      spfa_generate_instruction_box();                        
    } 
  });

});

//get max z-index
function spfa_maxZ(){
  //zindex for be on top 
  window.spfa_maxZ = Math.max.apply(null,jQuery.map(jQuery('body > *'), function(e,n){
     if(jQuery(e).css('position')=='absolute')
          return parseInt(jQuery(e).css('z-index'))||1 ;
     })
  );
  return spfa_maxZ++;
}

//generate instruction box
function spfa_generate_instruction_box(toggle_effect){
  //create the body of the box
  //add a delay for not opening the editor box immediatly
  setTimeout(function(){
    var frame = document.createElement('ifrmame');
    var box = document.createElement("div");
    box.setAttribute("id","spfa_instruction_box");
    var box_text = document.createElement("p");
    box_text.setAttribute("id","spfa_instruction_box_text");
    box_text.textContent="Please select the element to animate"; 
    close_button=document.createElement('button');
    close_button.setAttribute('id','spfa_instruction_box_close_button');
    close_button.onclick = function(){ 
                                        jQuery( "#spfa_instruction_box").remove();
                                        jQuery("body *").children().removeClass("spfa_mouseOn");
                                        jQuery.fx.off=false;
                                        if(jQuery("#spfa_tabs_div").length){
                                          jQuery( "div" ).remove( "#spfa_tabs_div" );
                                        } 
                                      };
    box.appendChild(box_text);                                  
    box.appendChild(close_button); 
    document.getElementById('wpadminbar').appendChild(box);
    //zindex for be on top
    jQuery('#spfa_instruction_box').css('z-index','2000000');           
  },100)
}

//function to generate instruction box for trigger selector
function spfa_generate_trigger_instruction_box(){
  jQuery( "#spfa_instruction_box").remove();
  jQuery("body *").children().removeClass("spfa_mouseOn");
  //create the body of the box
  //add a delay for not opening the editor box immediatly
  setTimeout(function(){
    var trigger_box = document.createElement("div");
    trigger_box.setAttribute("id","spfa_trigger_instruction_box");
    var trigger_box_text = document.createElement("p");
    trigger_box_text.setAttribute("id","spfa_trigger_instruction_box_text");
    trigger_box_text.textContent="Please select an element for triggering the animation"; 
    trigger_close_button=document.createElement('button');
    trigger_close_button.setAttribute('id','spfa_instruction_box_trigger_close_button');
    trigger_close_button.onclick = function(){ 
                              jQuery( "#spfa_trigger_instruction_box").remove();
                              jQuery("body *").children().removeClass("spfa_trigger_mouseOn");
                              spfa_generate_instruction_box();                        
                             };
    trigger_box.appendChild(trigger_box_text);                         
    trigger_box.appendChild(trigger_close_button); 
    document.getElementById('wpadminbar').appendChild(trigger_box);
    //zindex for be on top
    jQuery('#spfa_trigger_instruction_box').css('z-index','2000000');           
  },100)
}

//function for post and responce with all the selectors from db
function spfa_upload_selectors(){
  jQuery(document).ready(function($) {
    var data = {
      'action': 'spfa_php_ajax_responce_upload',
      'security': spfa_ajax_params.spfa_nonce,
      'page_url': window.location.href
    };
    
    jQuery.post(spfa_ajax_params.ajaxurl, data, function(response) {
      if (response){
        var array=JSON.parse(response.replace(/\\\\/g,''));
        array.forEach(function(element) {
            args=(JSON.parse(element.text_json));
            //store to local storage
            localStorage.setItem(args.item_id, JSON.stringify(args));
            //play the effects
            spfa_upload_and_play_effect(args);
            spfa_flag_mouse_once[args.item_id] = 'stopped';
            var spfa_item=args.item_id;
            //trigger the hover flag 
            jQuery(spfa_item).hover(
              function() {
                spfa_hover_flag_array[spfa_item] = true;
              },
              function () {
                spfa_hover_flag_array[spfa_item] = false;
              });
            if(args.trigger_item && args.trigger_item!='self_triggered'){
              spfa_item=args.trigger_item;
              jQuery(spfa_item).hover(
              function() {
                spfa_hover_flag_array[spfa_item] = true;
              },
              function () {
                spfa_hover_flag_array[spfa_item] = false;
              });
            }
        });
      }
      
    }); 
  });
}

function spfa_clear_local_storage(){
  var key;
  var lc_length=localStorage.length;
  jQuery.each(localStorage, function(key, value){
    if (typeof value === 'string' || value instanceof String){
      if (value.includes("spfa_flag")){
        localStorage.removeItem(key); 
      }
    }
  }); 
}

//function for playing effects on upload
function spfa_upload_and_play_effect(args){
  //check flag
  if (jQuery(args.item_id).queue().length>0){
    return;
  }
  //check if trigger item is set
  if(args.trigger_item != 'self_triggered' && args.trigger_item != null){
    element=args.trigger_item;
  }
  else{
    element=args.item_id;
  }
  //////////////////////////////////////case run on mouse over/////////////////////////
  if(args.run_on=='mouse'){
    jQuery(element).mouseover(function(){
                                          if ((spfa_flag_mouse_once[args.item_id] == 'stopped') && !(jQuery('#spfa_trigger_instruction_box')).length && !(jQuery('#spfa_instruction_box').length)){
                                            spfa_run_effects(args);
                                            
                                          }
                                        }
                                      );
  }

  //////////////////////////////////////case run on window show//////////////////////////
  else{
    setTimeout(function(){              
      if(!spfa_isScrolledIntoView(args.item_id)){
        var spfa_triggerAtY = jQuery(args.item_id).offset().top - jQuery(window).outerHeight();
        jQuery(window).scroll(function(event) {
          // #target not yet in view
          if (spfa_triggerAtY > jQuery(window).scrollTop()) {
            return;
          }

          spfa_run_effects(args);
          // remove this event handler
          jQuery(this).off(event);
        });
      }
      else{
        spfa_run_effects(args);
      } 
    },1000);     
  }
}

function spfa_run_effects(args){ 
  //check is instruction boxes are on
  if(( jQuery( "#spfa_instruction_box" ).length )||( jQuery( "#spfa_trigger_instruction_box" ).length )){
    return;
  }
  //placeholder
  var placeholder_element=jQuery(args.item_id);
  jQuery.spfa_effects.createPlaceholder(placeholder_element);
  //zed index
  jQuery(args.item_id).css('z-index','99998');
  //rise the run flag
  spfa_flag_mouse_once[args.item_id] = 'running';
  //set transitio to none
  jQuery(args.item_id).css( "transition", "none" );
  //show the hidden elements
  if(args.init_visibility=='hide'){
    setTimeout(function(){ 
      jQuery(args.item_id).animate({ "opacity": 1},{duration:Number(args[`frame1msec`]),queue:false});
    },Number(args[`frame0msec`]));
  }
  //counter for ui effects complete function
  var counter = 0;

  for (var i = 0; i < args.frame_num; i++) {
    var effect = args[`frame${i}effect`];
    var frame_time=Number(args[`frame${i}msec`]);

    //check for second effect
    if((args[`frame${i}effect2`]) && (args[`frame${i}effect2`]!="")){
        effect = args[`frame${i}effect2`];
        spfa_dequeue_run_effects(effect,frame_time,args,i)
        effect = args[`frame${i}effect`];
    } 

    if (effect=='spfa_color'){
      jQuery(args.item_id).animate({color: args[`frame${i}option1`],backgroundColor: args[`frame${i}option2`]},Number(args[`frame${i}msec`]));
    }

    else if(effect=='spfa_move'){
      jQuery(args.item_id).animate({ "margin-left": `+=${args[`frame${i}option1`]}px`,"margin-top": `+=${args[`frame${i}option2`]}px`},Number(args[`frame${i}msec`]));
    }

    else if(effect=='spfa_scale'){
      var calc_width = `${args.init_width*(args[`frame${i}option1`]/100)}`;
      var calc_height = `${args.init_height*(args[`frame${i}option1`]/100)}`;
      var calc_fontsize = `${(parseInt(args.init_fontsize.replace('px','')))*(args[`frame${i}option1`]/100)}`;
      var current_width = parseInt(jQuery(args.item_id).css('width').replace('px',''));
      var current_margin_left =  parseInt(jQuery(args.item_id).css('margin-left').replace('px',''));
      var calc_margin_left = current_margin_left+(current_width - calc_width)/2;
      var current_height = parseInt(jQuery(args.item_id).css('height').replace('px',''));
      var current_margin_top =  parseInt(jQuery(args.item_id).css('margin-top').replace('px',''));
      var calc_margin_top = current_margin_top+(current_height - calc_height)/2;
      jQuery(args.item_id).css( "transition", "none" );
      jQuery(args.item_id).css( "max-height", "none" );
      jQuery(args.item_id).css( "max-width", "none" );
      jQuery(args.item_id).animate({'width':calc_width,'height':calc_height,'fontSize': `${calc_fontsize}px`},{duration:Number(args[`frame${i}msec`])});
    }

    else if(effect=='spfa_rotate'){
      jQuery(args.item_id).animate({ deg_rotate: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                  spfa_transform_array['rotate']=now;
                                                                                                  spfa_do_transform_animation(args.item_id);
                                                                                                }});   
    }

    else if(effect=='spfa_rotateX'){
      jQuery(args.item_id).animate({ deg_rotateX: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                  spfa_transform_array['rotateX']=now;
                                                                                                  spfa_do_transform_animation(args.item_id);
                                                                                                }});   
    }

    else if(effect=='spfa_rotateY'){
      jQuery(args.item_id).animate({ deg_rotateY: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                  spfa_transform_array['rotateY']=now;
                                                                                                  spfa_do_transform_animation(args.item_id);
                                                                                                }});   
    } 

    else if(effect=='spfa_skewX'){
      jQuery(args.item_id).animate({ deg_skew_X: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                  spfa_transform_array['skewX']=now;
                                                                                                  spfa_do_transform_animation(args.item_id);
                                                                                                }});   
    }

    else if(effect=='spfa_skewY'){
      jQuery(args.item_id).animate({ deg_skew_Y: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                  spfa_transform_array['skewY']=now;
                                                                                                  spfa_do_transform_animation(args.item_id);
                                                                                                }});   
    }

    //give a delay 
    else if(effect=='spfa_delay'){
      jQuery(args.item_id).delay(Number(args[`frame${i}msec`]))
    } 

    else if(effect=="spfa_fade_in"){
      jQuery(args.item_id).animate({'opacity':0},100);
      jQuery(args.item_id).animate({'opacity':1,},Number(args[`frame${i}msec`]));
    } 

     else if(effect=="spfa_fade_out" ){
        jQuery(args.item_id).animate({'opacity':0},Number(args[`frame${i}msec`]));
      }   

    else{
      if(effect!=null){
        jQuery(args.item_id).spfa_effect( effect, {duration:Number(args[`frame${i}msec`])} );

      }
    } 
  }

  if (!(args.run_for=='once' && args.recover_opt=='no')){
    jQuery(args.item_id).queue(function() {
                                            if (args.run_on=='mouse'){
                                              spfa_recover_from_mouse_events(args);
                                            }
                                            else{
                                              spfa_recover_from_window_after_load(args);
                                            }
                                            jQuery(args.item_id).dequeue();
                                          });   
  }
  else{
    jQuery(args.item_id).queue(function() {
      var placeholder_element=jQuery(args.item_id);
      //jQuery.spfa_effects.restoreStyle(placeholder_element,args.init_css_position);
      //jQuery.spfa_effects.removePlaceholder(placeholder_element);
      jQuery(args.item_id).dequeue();
    });  
  }
}

//function for parallel effect
function spfa_dequeue_run_effects(effect,frame_time,args,i){
  jQuery(args.item_id).css( "transition", "none" )

  if (effect=='spfa_color'){
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      jQuery(args.item_id).animate({color: args[`frame${i}option3`],backgroundColor: args[`frame${i}option4`]},{duration:frame_time,queue:false});
    });  
  }

  else if(effect=='spfa_rotate'){
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      jQuery(args.item_id).animate({ deg_rotate: args[`frame${i}option3`] },{duration: frame_time,queue:false,step: function(now) {
                                                                                                               spfa_transform_array['rotate']=now;
                                                                                                               spfa_do_transform_animation(args.item_id);
                                                                                                             }});
    }); 
  }

  else if(effect=='spfa_rotateX'){
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      jQuery(args.item_id).animate({ deg_rotateX: args[`frame${i}option3`] },{duration: frame_time,queue:false,step: function(now) {
                                                                                                               spfa_transform_array['rotateX']=now;
                                                                                                               spfa_do_transform_animation(args.item_id);
                                                                                                             }});
    }); 
  }

  else if(effect=='spfa_rotateY'){
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      jQuery(args.item_id).animate({ deg_rotateY: args[`frame${i}option3`] },{duration: frame_time,queue:false,step: function(now) {
                                                                                                               spfa_transform_array['rotateY']=now;
                                                                                                               spfa_do_transform_animation(args.item_id);
                                                                                                             }});
    }); 
  }

  else if(effect=='spfa_skewX'){
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      jQuery(args.item_id).animate({ deg_skew_X: args[`frame${i}option3`] },{duration: frame_time,queue:false,step: function(now) {
                                                                                                               spfa_transform_array['skewX']=now;
                                                                                                               spfa_do_transform_animation(args.item_id);
                                                                                                             }});
    }); 
  }

  else if(effect=='spfa_skewY'){
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      jQuery(args.item_id).animate({ deg_skew_Y: args[`frame${i}option3`] },{duration: frame_time,queue:false,step: function(now) {
                                                                                                               spfa_transform_array['skewY']=now;
                                                                                                               spfa_do_transform_animation(args.item_id);
                                                                                                             }});
    }); 
  }

  else if(effect=='spfa_move'){
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      jQuery(args.item_id).animate({ "margin-left": `+=${args[`frame${i}option3`]}px`,"margin-top": `+=${args[`frame${i}option4`]}px`},{duration:frame_time,queue:false});
    });   
  }

  else if(effect=='spfa_scale'){ 
    jQuery(args.item_id).css( "max-height", "none" );
    jQuery(args.item_id).css( "max-width", "none" );
    jQuery(args.item_id).queue(function(){
      jQuery(args.item_id).dequeue();
      var calc_width = `${args.init_width*(args[`frame${i}option3`]/100)}`;
      var calc_height = `${args.init_height*(args[`frame${i}option3`]/100)}`;
      var calc_fontsize = `${(parseInt(args.init_fontsize.replace('px','')))*(args[`frame${i}option3`]/100)}`;
      var current_width = parseInt(jQuery(args.item_id).css('width').replace('px',''));
      var current_margin_left =  parseInt(jQuery(args.item_id).css('margin-left').replace('px',''));
      var calc_margin_left = current_margin_left+(current_width - calc_width)/2;
      var current_height = parseInt(jQuery(args.item_id).css('height').replace('px',''));
      var current_margin_top =  parseInt(jQuery(args.item_id).css('margin-top').replace('px',''));
      var calc_margin_top = current_margin_top+(current_height - calc_height)/2;
      jQuery(args.item_id).animate({'width':calc_width,'height':calc_height,'fontSize': `${calc_fontsize}px`},{duration:frame_time,queue:false});
    }); 
  }

  else{
    if(effect!=null){
      jQuery(args.item_id).queue(function(){
        jQuery(args.item_id).dequeue();
        jQuery(args.item_id).spfa_effect( effect, {duration:frame_time,queue:false} );
      });
    }  
  }    
}

function spfa_recover_from_mouse_events(args){
  //check if trigger item is set
  if(args.trigger_item != 'self_triggered' && args.trigger_item != null){
    element=args.trigger_item;
  }
  else{
    element=args.item_id;
  }

  if (args.run_for=='once'){
      if (spfa_hover_flag_array[element]==true) {
        jQuery(element).one('mouseleave',function(){
          spfa_general_recover(args);
        });
      }
      else{//not hover
        spfa_general_recover(args);
      } 
  }
  
  if (args.run_for=='loop'){
    spfa_general_recover(args);                                    
  }  
};


function spfa_recover_from_window_after_load(args){
  if (args.run_for=='once'){
    jQuery(args.item_id).queue(function() {
                                            spfa_general_recover(args);
                                            jQuery(args.item_id).dequeue();
                                          });
  }
  
  if (args.run_for=='loop'){
    jQuery(args.item_id).queue(function() {
        spfa_general_recover(args);
        jQuery(args.item_id).dequeue();
    });   
  };
}

function spfa_general_recover(args){
  spfa_flag_mouse_once[args.item_id] = 'running';
  //recover visibillity 
  jQuery(args.item_id).animate({'opacity':1,},{duration:1000,queue:false});
  //create table with all the effects
  var spfa_primary_and_secondary_effects_array= new Array();
  for (var i = 0; i < args.frame_num; i++) {
    if(!spfa_primary_and_secondary_effects_array.includes(args[`frame${i}effect`])){
      spfa_primary_and_secondary_effects_array.push(args[`frame${i}effect`]);
    }
    if(!spfa_primary_and_secondary_effects_array.includes(args[`frame${i}effect2`])){
      spfa_primary_and_secondary_effects_array.push(args[`frame${i}effect2`]);
    }
  }
  //case there is no need for recover all are in 0 from previous frames
  var all_to_zero=(spfa_transform_array['rotate']==null || spfa_transform_array['rotate']==0) &&
                  (spfa_transform_array['rotateX']==null || spfa_transform_array['rotateX']==0) &&
                  (spfa_transform_array['rotateY']==null || spfa_transform_array['rotateY']==0) &&
                  (spfa_transform_array['skewX']==null || spfa_transform_array['skewX']==0) &&
                  (spfa_transform_array['skewY']==null || spfa_transform_array['skewY']==0) &&
                  jQuery(args.item_id).css('margin-left')==args.init_margin_left &&
                  jQuery(args.item_id).css('margin-top')==args.init_margin_top &&
                  jQuery(args.item_id).outerWidth() == args.init_width &&
                  jQuery(args.item_id).outerHeight() == args.init_height &&
                  jQuery(args.item_id).css("font-size") ==args.init_fontsize;           
  //check the table to see if recover is needed//
  if(spfa_primary_and_secondary_effects_array.includes('spfa_color')
    || spfa_primary_and_secondary_effects_array.includes('spfa_move')
    || spfa_primary_and_secondary_effects_array.includes('spfa_scale')
    || spfa_primary_and_secondary_effects_array.includes('spfa_rotate')
    || spfa_primary_and_secondary_effects_array.includes('spfa_rotateX')
    || spfa_primary_and_secondary_effects_array.includes('spfa_rotateY')
    || spfa_primary_and_secondary_effects_array.includes('spfa_skewX')
    || spfa_primary_and_secondary_effects_array.includes('spfa_skewY')){
    
    if(all_to_zero){
      spfa_flag_mouse_once[args.item_id] = 'stopped';
      //remove placeholder and restore
      var placeholder_element=jQuery(args.item_id);
      jQuery.spfa_effects.restoreStyle(placeholder_element,args.init_css_position);
      jQuery.spfa_effects.removePlaceholder(placeholder_element);
    }
    else
    setTimeout(function(){ 
                        spfa_flag_mouse_once[args.item_id] = 'stopped';
                        //remove placeholder and restore
                        var placeholder_element=jQuery(args.item_id);
                        jQuery.spfa_effects.restoreStyle(placeholder_element,args.init_css_position);
                        jQuery.spfa_effects.removePlaceholder(placeholder_element);
                     },1000);
  }
  else{
    spfa_flag_mouse_once[args.item_id] = 'stopped';
    //remove placeholder and restore
    var placeholder_element=jQuery(args.item_id);
    jQuery.spfa_effects.restoreStyle(placeholder_element,args.init_css_position);
    jQuery.spfa_effects.removePlaceholder(placeholder_element);
  }
  if(!all_to_zero){
    //run all the effects in parallel recover for 1000ms
    spfa_primary_and_secondary_effects_array.forEach(function(item){
      if (item=='spfa_color'){
        jQuery(args.item_id).animate({'color':`${args.init_color}`,'backgroundColor':`${args.init_background_color}`},{duration: 1000,queue:false});
      }

      else if(item=='spfa_scale'){
        var current_width = parseInt(jQuery(args.item_id).css('width').replace('px',''));
        var current_margin_left =  parseInt(jQuery(args.item_id).css('margin-left').replace('px',''));
        var calc_margin_left = current_margin_left+(current_width - args.init_width)/2;
        var current_height = parseInt(jQuery(args.item_id).css('height').replace('px',''));
        var current_margin_top =  parseInt(jQuery(args.item_id).css('margin-top').replace('px',''));
        var calc_margin_top = current_margin_top+(current_height - args.init_height)/2;
        jQuery(args.item_id).animate({ 'width':`${args.init_width}px`,'height':`${args.init_height}px`,'fontSize':args.init_fontsize},{duration: 1000,queue:false});
      }

      else if(item=='spfa_move'){
        jQuery(args.item_id).animate({ "margin-left": `${args.init_margin_left}`,"margin-top": `${args.init_margin_top}`},{duration: 1000,queue:false});
      }

      else if(item=='spfa_rotate'){
          jQuery(args.item_id).animate({ deg_rotate: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                        spfa_transform_array['rotate']=now;
                                                                                        spfa_do_transform_animation(args.item_id);
                                                                                      }});
      }

      else if(item=='spfa_rotateX'){
          jQuery(args.item_id).animate({ deg_rotateX: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                       spfa_transform_array['rotateX']=now;
                                                                                       spfa_do_transform_animation(args.item_id);
                                                                                     }});
      }    

      else if(item=='spfa_rotateY'){
          jQuery(args.item_id).animate({ deg_rotateY: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                        spfa_transform_array['rotateY']=now;
                                                                                        spfa_do_transform_animation(args.item_id);
                                                                                      }});
      }

      else if(item=='spfa_skewX'){
          jQuery(args.item_id).animate({ deg_skew_X: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                        spfa_transform_array['skewX']=now;
                                                                                        spfa_do_transform_animation(args.item_id);
                                                                                      }});
      }

      else if(item=='spfa_skewY'){
          jQuery(args.item_id).animate({ deg_skew_Y: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                        spfa_transform_array['skewY']=now;
                                                                                        spfa_do_transform_animation(args.item_id);
                                                                                      }});
      }

    });   
  }
  //check if loop is needed
  if (args.run_for=='loop'){
    if(args.run_on=='mouse'){
      //check if trigger item is set
      if(args.trigger_item != 'self_triggered' && args.trigger_item != null){
        var element=args.trigger_item;
      }
      if(spfa_flag_mouse_once[args.item_id] == 'stopped'){
        setTimeout(function(){
          if (args.trigger_item && args.trigger_item != 'self_triggered' && spfa_hover_flag_array[args.trigger_item]==true){
            spfa_run_effects(args);
          }
          else if (spfa_hover_flag_array[args.item_id]==true && spfa_flag_mouse_once[args.item_id] == 'stopped') {
            //jQuery(args.item_id).clearQueue()
            spfa_run_effects(args);
          }
        },100);
      }
      else{
        setTimeout(function(){ 
          if (args.trigger_item && args.trigger_item != 'self_triggered' && spfa_hover_flag_array[args.trigger_item]==true){
            spfa_run_effects(args);
          }
          else if (spfa_hover_flag_array[args.item_id]==true && spfa_flag_mouse_once[args.item_id] == 'stopped') {
            spfa_run_effects(args);
          }
        },1100);
      }  
    }

    if (args.run_on=='window'){
      if(spfa_flag_mouse_once[args.item_id] == 'stopped'){
        setTimeout(function(){ 
          spfa_run_effects(args);
        },100);
      }
      else{
        setTimeout(function(){ 
          spfa_run_effects(args);
        },1100);
      }
      
    }  
  }

}

function spfa_do_transform_animation(element){
  var string=''
  if (spfa_transform_array['scale']!=null){
    string+=`scale(${parseFloat(spfa_transform_array['scale']).toFixed(2)}) `;
  }
  if (spfa_transform_array['rotate']!=null){
    string+=`rotate(${parseInt(spfa_transform_array['rotate'])}deg) `;
  }
  if (spfa_transform_array['rotateX']!=null){
    string+=`rotateX(${parseInt(spfa_transform_array['rotateX'])}deg) `;
  }
  if (spfa_transform_array['rotateY']!=null){
    string+=`rotateY(${parseInt(spfa_transform_array['rotateY'])}deg) `;
  }
  if (spfa_transform_array['skewX']!=null){
    string+=`skewX(${parseInt(spfa_transform_array['skewX'])}deg) `;
  }
  if (spfa_transform_array['skewY']!=null){
    string+=`skewY(${parseInt(spfa_transform_array['skewY'])}deg) `;
  }
  jQuery(element).css({transform: string});
}