
class spfa_anim_editor{

  constructor(item_id,something) {
    this.item_id = item_id;
    this.play_flag = false;
  }
  
  create_dialog(frame_num){
     var $dialog = jQuery('<div id="spfa_j_dialog"></div>')
    .html(function() {
      var output=`<div id="spfa_dialog_effect_time">
        <label for="effect_time_label" id="dialog_effect_time_label">Time</label>
          <div id="spfa_time_div">
            <input id="spfa_time_input" type="number" name="spfa_time" min="0" max="10000"> milliseconds
          </div>
      </div>`
      if (frame_num==0){
         output +=
          `<label for="init_visibility" id="spfa_init_visibility_label">Initial visibility</label>
            <div id="spfa_group_init_visibility">
              <input id="init_visibility_radio_show" type="radio" value="show" name="spfa_radio_vis"> show
              <input id="init_visibility_radio_hide" type="radio" value="hide" name="spfa_radio_vis"> hide
            </div>`
      }
      
       output +=
       `<div id="spfa_dialog">
          <div id="spfa_dialog_effect_selection"> 
          <label for="effect" id="dialog_effect_label">Main effect</label>
          <div id="spfa_effect_selection"> 
            <select id="spfa_effect_selection_select">
              <option value="spfa_bounce">Bounce</option>
              <option value="spfa_shake">Shake</option>
              <option value="spfa_color">Color</option>
              <option value="spfa_move">Move</option>
              <option value="spfa_scale">Scale</option>
              <option value="spfa_rotate">Rotate</option>
              <option value="spfa_rotateX">RotateX</option>
              <option value="spfa_rotateY">RotateY</option>
              <option value="spfa_skewX">skewX</option>
              <option value="spfa_skewY">skewY</option>
              <option value="spfa_pulsate">Pulsate</option>
              <option value="spfa_highlight">Highlight</option>
              <option value="spfa_fade_out">Fade out</option>
              <option value="spfa_fade_in">Fade in</option>
              <option value="spfa_fold">Fold</option>
              <option value="spfa_slide">Slide</option>
              <option value="spfa_delay">Delay</option>
            </select>
          </div>
        </div>
      </div> 

      <div id="second_spfa_dialog_effect_selection"> 
          <label for="second_effect" id="second_dialog_effect_label">Second effect</label>
          <div id="second_spfa_effect_selection"> 
            <select id="second_spfa_effect_selection_select">
              <option value="no_effect">No effect</option>
              <option value="spfa_color">Color</option>
              <option value="spfa_move">Move</option>
              <option value="spfa_scale">Scale</option>
              <option value="spfa_rotate">Rotate</option>
              <option value="spfa_rotateX">RotateX</option>
              <option value="spfa_rotateY">RotateY</option>
              <option value="spfa_skewX">skewX</option>
              <option value="spfa_skewY">skewY</option>
            </select>
          </div>
        </div> 
      `;
      return output;
    })
    .dialog({
        open: function(){
          localStorage.setItem('frame_num',frame_num)
          //need timeout function in order to give time to the modal dialog to create
          setTimeout(function(){classInstance.apply_options(false)},100);
          setTimeout(function(){classInstance.apply_second_effect_options(false)},100);
        },
        autoOpen: true,
        position: { my: "center", at: "center", of: window },
        title: 'Animation settings',
        //autoResize:true,
        modal: true,
        width: 400,
        height: 600,
        buttons: {
          'Ok': function() {//adding selected options to memory at case of animation choise with option
            var effect= jQuery('#spfa_effect_selection_select>option:selected', this).val();
            var second_effect= jQuery('#second_spfa_effect_selection_select>option:selected', this).val();
            var frame_msec= jQuery('#spfa_time_input').val();
            
            //checking for initial visibility and set the parameter
            if (jQuery('#spfa_group_init_visibility').length){
              if(jQuery("input[id='init_visibility_radio_show']:checked").val()){
                var init_visibility="show";
              }
              else if(jQuery("input[id='init_visibility_radio_hide']:checked").val()){
                var init_visibility="hide";
              }
            }
          
            switch(effect) {
              case 'spfa_color':
                if (jQuery("#colorpicker1").spectrum("get")){
                  var t1 = jQuery("#colorpicker1").spectrum("get");
                  var option1=t1.toRgbString();//rgb output
                }
                else{
                  var option1='';
                } 

                if (jQuery("#colorpicker2").spectrum("get")){
                  var t2 = jQuery("#colorpicker2").spectrum("get");
                  var option2=t2.toRgbString();//rgb output
                }
                else{
                  var option2='';
                }  

                //var option3='',option4='',option5 = '';
              break;

              case 'spfa_move':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#move_left_id').val())){
                    alert('number of horizontal pixels please');
                    return;
                }
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#move_top_id').val())){
                    alert('number vertical pixels please');
                    return;
                }
                if (parseInt(jQuery('#move_left_id').val(), 10)) {
                  var option1 = parseInt(jQuery('#move_left_id').val(), 10);
                }
                if (jQuery('#move_left_id').val()==0){
                   var option1 = 0;
                }

                if (parseInt(jQuery('#move_top_id').val(), 10)) {
                  var option2 = parseInt(jQuery('#move_top_id').val(), 10);
                }
                if (jQuery('#move_top_id').val()==0){
                   var option2 = 0;
                }
                //var option3='',option4= '',option5 = '';
              break;

              case 'spfa_scale':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#scale_id').val())){
                    alert('Scale percent please');
                    return;
                }
                if(jQuery('#scale_id').val()==0){
                  var option1 = 0;
                }
                else if (parseInt(jQuery('#scale_id').val(), 10)) {
                  var option1 = parseInt(jQuery('#scale_id').val(), 10);
                }
                else{
                  var option1='', option2='';
                }  
                //var option2='', option3='', option4= '', option5 = '';
              break;

              case 'spfa_rotate':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#rotate_id').val())){
                    alert('Rotate degrees please');
                    return;
                }
                if(jQuery('#rotate_id').val()==0){
                  var option1 = 0;
                }
                else if (parseInt(jQuery('#rotate_id').val(), 10)) {
                  var option1 = parseInt(jQuery('#rotate_id').val(), 10);
                }
                else{
                  var option1='', option2='';
                }  
                //var option2='', option3='', option4= '', option5 = '';
              break;

              case 'spfa_rotateX':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#rotateX_id').val())){
                    alert('RotateX degrees please');
                    return;
                }
                if(jQuery('#rotateX_id').val()==0){
                  var option1 = 0;
                }
                else if (parseInt(jQuery('#rotateX_id').val(), 10)) {
                  var option1 = parseInt(jQuery('#rotateX_id').val(), 10);
                }
                else{
                  var option1='', option2='';
                }  
                //var option2='', option3='', option4= '', option5 = '';
              break;  

              case 'spfa_rotateY':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#rotateY_id').val())){
                    alert('RotateY degrees please');
                    return;
                }
                if(jQuery('#rotateY_id').val()==0){
                  var option1 = 0;
                }
                else if (parseInt(jQuery('#rotateY_id').val(), 10)) {
                  var option1 = parseInt(jQuery('#rotateY_id').val(), 10);
                }
                else{
                  var option1='', option2='';
                }  
                //var option2='', option3='', option4= '', option5 = '';
              break;

              case 'spfa_skewX':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#skewX_id').val())){
                    alert('SkewX degrees please');
                    return;
                }
                if(jQuery('#skewX_id').val()==0){
                  var option1 = 0;
                }
                else if (parseInt(jQuery('#skewX_id').val(), 10)) {
                  var option1 = parseInt(jQuery('#skewX_id').val(), 10);
                }
                else{
                  var option1='', option2='';
                }  
                //var option2='', option3='', option4= '', option5 = '';
              break;

              case 'spfa_skewY':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#skewY_id').val())){
                    alert('SkewY degrees please');
                    return;
                }
                if(jQuery('#skewY_id').val()==0){
                  var option1 = 0;
                }
                else if (parseInt(jQuery('#skewY_id').val(), 10)) {
                  var option1 = parseInt(jQuery('#skewY_id').val(), 10);
                }
                else{
                  var option1='', option2='';
                }  
                //var option2='', option3='', option4= '', option5 = '';
              break;  

              default:var option1='', option2='';
            } 

            /////////////////////////////////second effect////////////////////////////
            switch(second_effect) {
              case 'spfa_color':
                if (jQuery("#second_colorpicker1").spectrum("get")){
                  var st1 = jQuery("#second_colorpicker1").spectrum("get");
                  var option3=st1.toRgbString();//rgb output
                }
                else{
                  var option3='';
                } 

                if (jQuery("#second_colorpicker2").spectrum("get")){
                  var st2 = jQuery("#second_colorpicker2").spectrum("get");
                  var option4=st2.toRgbString();//rgb output
                }
                else{
                  var option4='';
                }  

              break;

              case 'spfa_move':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_move_left_id').val())){
                    alert('number of horizontal pixels please');
                    return;
                }
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_move_top_id').val())){
                    alert('number of vertical pixels please');
                    return;
                }
                if (parseInt(jQuery('#second_move_left_id').val(), 10)) {
                  var option3 = parseInt(jQuery('#second_move_left_id').val(), 10);
                }
                if (jQuery('#second_move_left_id').val()==0){
                   var option3 = 0;
                }

                if (parseInt(jQuery('#second_move_top_id').val(), 10)) {
                  var option4 = parseInt(jQuery('#second_move_top_id').val(), 10);
                }
                if (jQuery('#second_move_top_id').val()==0){
                   var option4 = 0;
                }

              break;

              case 'spfa_scale':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_scale_id').val())){
                    alert('Scale percent please');
                    return;
                }
                if(jQuery('#second_scale_id').val()==0){
                  var option3 =0;
                }
                else if (parseInt(jQuery('#second_scale_id').val(), 10)) {
                  var option3 = parseInt(jQuery('#second_scale_id').val(), 10);
                }
                else{
                  var option3='', option4='';
                }  
              break;

              case 'spfa_rotate':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_rotate_id').val())){
                    alert('Rotate degrees please');
                    return;
                }
                if(jQuery('#second_rotate_id').val()==0){
                  var option3 =0;
                }
                else if (parseInt(jQuery('#second_rotate_id').val(), 10)) {
                  var option3 = parseInt(jQuery('#second_rotate_id').val(), 10);
                }
                else{
                  var option3='', option4='';
                }  
              break;

              case 'spfa_rotateX':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_rotateX_id').val())){
                    alert('RotateX degrees please');
                    return;
                }
                if(jQuery('#second_rotateX_id').val()==0){
                  var option3 =0;
                }
                else if (parseInt(jQuery('#second_rotateX_id').val(), 10)) {
                  var option3 = parseInt(jQuery('#second_rotateX_id').val(), 10);
                }
                else{
                  var option3='', option4='';
                }  
              break;

              case 'spfa_rotateY':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_rotateY_id').val())){
                    alert('RotateY degrees please');
                    return;
                }
                if(jQuery('#second_rotateY_id').val()==0){
                  var option3 =0;
                }
                else if (parseInt(jQuery('#second_rotateY_id').val(), 10)) {
                  var option3 = parseInt(jQuery('#second_rotateY_id').val(), 10);
                }
                else{
                  var option3='', option4='';
                }  
              break;

              case 'spfa_skewX':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_skewX_id').val())){
                    alert('SkewX degrees please');
                    return;
                }
                if(jQuery('#second_skewX_id').val()==0){
                  var option3 =0;
                }
                else if (parseInt(jQuery('#second_skewX_id').val(), 10)) {
                  var option3 = parseInt(jQuery('#second_skewX_id').val(), 10);
                }
                else{
                  var option3='', option4='';
                }  
              break;

              case 'spfa_skewY':
                //alert if not number
                if (!jQuery.isNumeric(jQuery('#second_skewY_id').val())){
                    alert('SkewY degrees please');
                    return;
                }
                if(jQuery('#second_skewY_id').val()==0){
                  var option3 =0;
                }
                else if (parseInt(jQuery('#second_skewY_id').val(), 10)) {
                  var option3 = parseInt(jQuery('#second_skewY_id').val(), 10);
                }
                else{
                  var option3='', option4='';
                }  
              break;

              case 'no_effect':
                second_effect='';
                var option3='', option4='';
              break;

              default:var option3='', option4='';
            } 

            classInstance.add_effect(effect,frame_num,frame_msec,second_effect,option1,option2,option3,option4);
            jQuery( this ).dialog( "close" );
           },

          'Delete': function(){
            classInstance.delete_cell(frame_num);
            jQuery( this ).dialog( "close" );
          }
      },
    });  
    

    //Need to run for deleting  for re open
    jQuery('#spfa_j_dialog').on('dialogclose', function(event) {
      jQuery('#spfa_j_dialog').remove();
    });
    
    //catch radio show/hide and se immediatly local storage
    jQuery("#init_visibility_radio_show").change(function(e) {
      // get the arguments
      var args =  classInstance.browser_localstorage('get');
      //modify the arguments
      args.init_visibility='show'; 
      //save the modified arguments
      classInstance.browser_localstorage('set',args);
    });
    jQuery("#init_visibility_radio_hide").change(function(e) {
      // get the arguments
      var args =  classInstance.browser_localstorage('get');
      //modify the arguments
      args.init_visibility='hide'; 
      //save the modified arguments
      classInstance.browser_localstorage('set',args);
    });  

    //Catch dialog effect selection and do...//need timeout in order to avoid trigger on div creation (append)
    setTimeout(function(){
      jQuery("#spfa_effect_selection_select").change(function(e) {
        var choise = jQuery(this).find("option:selected").val();
        if(choise!=jQuery('#second_spfa_effect_selection_select').find("option:selected").val()){
          jQuery("#spfa_options_id").remove();
          classInstance.apply_options(choise);
        }
        else{
          alert('Cannot choose the same effect');
          classInstance.apply_options('recover');
        }
      }); 
    },100)

    setTimeout(function(){
      jQuery("#second_spfa_effect_selection_select").change(function(e) {
        var choise = jQuery(this).find("option:selected").val();
        if(choise!=jQuery('#spfa_effect_selection_select').find("option:selected").val()){
          jQuery("#second_spfa_options_id").remove();
          classInstance.apply_second_effect_options(choise);
        }
        else{
          alert('Cannot choose the same effect');
          classInstance.apply_second_effect_options('recover');
        }
        
      }); 
    },100)

  }

  apply_options(select){
    //Get the frame that opened the dialog
    var opened_frame=localStorage.getItem('frame_num');    
    // get the arguments
    var args =  this.browser_localstorage('get');

    //case that function is called to recover from second effect wrong choise
    if (select=='recover'){
      jQuery('#spfa_effect_selection_select').val(args[`frame${opened_frame}effect`]);
      return;
    }

    //set the frame time
    if(args[`frame${opened_frame}msec`]){
      jQuery('#spfa_time_input').val(args[`frame${opened_frame}msec`]);
    }
    else if (!(jQuery('#spfa_time_input').val())){
      jQuery('#spfa_time_input').val('1000');
    }

    if(jQuery('#spfa_group_init_visibility').length){
      if(args.init_visibility=='show'){
        jQuery('input:radio[id=init_visibility_radio_show]').attr('checked', true);  
        jQuery('input:radio[id=init_visibility_radio_hide]').attr('checked', false); 
      }
      if(args.init_visibility=='hide'){
        jQuery('input:radio[id=init_visibility_radio_show]').attr('checked', false);  
        jQuery('input:radio[id=init_visibility_radio_hide]').attr('checked', true);
      }
    }
    

    //set value according to memory (if exists) on open dialog
    if (args[`frame${opened_frame}effect`] && select==false){
      jQuery('#spfa_effect_selection_select').val(args[`frame${opened_frame}effect`]).change();
      select=args[`frame${opened_frame}effect`];
    }

    //show second effect option box
    jQuery('#second_spfa_effect_selection_select').show();
    
    if(jQuery('#spfa_group_init_visibility').length){
      jQuery('#spfa_group_init_visibility').show();
      jQuery('#spfa_init_visibility_label').show();

    }

    switch (select){
      case 'spfa_delay'://disable second effect
        jQuery("#second_spfa_options_id").remove();
        classInstance.apply_second_effect_options('no_effect');
        jQuery('#second_spfa_effect_selection_select').val('no_effect');
        jQuery('#second_spfa_effect_selection_select').hide(); 
      break;

      case 'spfa_color':
        //add  color
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id='colorpicker1' />Color
          <input id='colorpicker2' />Background color
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && args[`frame${opened_frame}option1`]){
          jQuery("#colorpicker1").spectrum({
              color: args[`frame${opened_frame}option1`]
          });
        }
        else{
          jQuery("#colorpicker1").spectrum({
             allowEmpty: true,
          });
        }

        if((args[`frame${opened_frame}effect`]==select) && args[`frame${opened_frame}option2`]){
          jQuery("#colorpicker2").spectrum({
              color: args[`frame${opened_frame}option2`]
          });
        }
        else{
          jQuery("#colorpicker2").spectrum({
             allowEmpty: true,
          });
        }
      break;

      case 'spfa_move':
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id="move_left_id" type="number" name="Horizontal" min="-5000" max="5000" />Horizontal pixels
          <input id="move_top_id" type="number" name="Vertical" min="-5000" max="5000"  />Vertical pixels
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option1`])||args[`frame${opened_frame}option1`]==0){
          jQuery('#move_left_id').val(args[`frame${opened_frame}option1`]);
        }


        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option2`]||args[`frame${opened_frame}option2`]==0)){
          jQuery('#move_top_id').val(args[`frame${opened_frame}option2`]);
        }

      break;

      case 'spfa_scale':
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id="scale_id" type="number" name="Scale" min="0" max="2000"/>Scale percent %
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option1`] || args[`frame${opened_frame}option1`]==0)){
          jQuery('#scale_id').val(args[`frame${opened_frame}option1`]);
        }
        else{
          jQuery('#scale_id').val(null);
        }
      break;

      case 'spfa_rotate':
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id="rotate_id" type="number" name="Rotate" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option1`] || args[`frame${opened_frame}option1`]==0)){
          jQuery('#rotate_id').val(args[`frame${opened_frame}option1`]);
        }
        else{
          jQuery('#rotate_id').val(null);
        }
      break;

      case 'spfa_rotateX':
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id="rotateX_id" type="number" name="RotateX" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option1`] || args[`frame${opened_frame}option1`]==0)){
          jQuery('#rotateX_id').val(args[`frame${opened_frame}option1`]);
        }
        else{
          jQuery('#rotateX_id').val(null);
        }
      break;

      case 'spfa_rotateY':
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id="rotateY_id" type="number" name="RotateY" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option1`] || args[`frame${opened_frame}option1`]==0)){
          jQuery('#rotateY_id').val(args[`frame${opened_frame}option1`]);
        }
        else{
          jQuery('#rotateY_id').val(null);
        }
      break;

      case 'spfa_skewX':
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id="skewX_id" type="number" name="SkewX" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option1`] || args[`frame${opened_frame}option1`]==0)){
          jQuery('#skewX_id').val(args[`frame${opened_frame}option1`]);
        }
        else{
          jQuery('#skewX_id').val(null);
        }
      break;

      case 'spfa_skewY':
        jQuery("#spfa_dialog_effect_selection").append(`<div id="spfa_options_id">
          <input id="skewY_id" type="number" name="SkewY" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect`]==select) && (args[`frame${opened_frame}option1`] || args[`frame${opened_frame}option1`]==0)){
          jQuery('#skewY_id').val(args[`frame${opened_frame}option1`]);
        }
        else{
          jQuery('#skewY_id').val(null);
        }
      break;

    }

  }  
   

  //apply options for second effect
  apply_second_effect_options(select){
    //Get the frame that opened the dialog
    var opened_frame=localStorage.getItem('frame_num');    
    // get the arguments
    var args =  this.browser_localstorage('get');

    //case that function is called to recover from second effect wrong choise
    if (select=='recover'){
      jQuery('#second_spfa_effect_selection_select').val(args[`frame${opened_frame}effect2`]);
      return;
    }

    //set value according to memory (if exists) on open dialog
    if (args[`frame${opened_frame}effect2`] && select==false){
      jQuery('#second_spfa_effect_selection_select').val(args[`frame${opened_frame}effect2`]).change();
      select=args[`frame${opened_frame}effect2`];
    }
    // var opened_frame=localStorage.getItem('frame_num');
    // var args =  this.browser_localstorage('get');

    switch (select){
      case 'spfa_color':
        //add  color
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id='second_colorpicker1' />Color
          <input id='second_colorpicker2' />Background color
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && args[`frame${opened_frame}option3`]){
          jQuery("#second_colorpicker1").spectrum({
              color: args[`frame${opened_frame}option3`]
          });
        }
        else{
          jQuery("#second_colorpicker1").spectrum({
             allowEmpty: true,
          });
        }

        if((args[`frame${opened_frame}effect2`]==select) && args[`frame${opened_frame}option4`]){
          jQuery("#second_colorpicker2").spectrum({
              color: args[`frame${opened_frame}option4`]
          });
        }
        else{
          jQuery("#second_colorpicker2").spectrum({
             allowEmpty: true,
          });
        }
      break;

      case 'spfa_move':
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id="second_move_left_id" type="number" name="Horizontal" min="-5000" max="5000" />Horizontal pixels
          <input id="second_move_top_id" type="number" name="Vertical" min="-5000" max="5000"  />Vertical pixels
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option3`]||args[`frame${opened_frame}option3`]==0)){
          jQuery('#second_move_left_id').val(args[`frame${opened_frame}option3`]);
        }

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option4`]||args[`frame${opened_frame}option4`]==0)){
          jQuery('#second_move_top_id').val(args[`frame${opened_frame}option4`]);
        }

      break;

      case 'spfa_scale':
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id="second_scale_id" type="number" name="Scale" min="0" max="2000"/>Scale percent %
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option3`]||args[`frame${opened_frame}option3`]==0)){
          jQuery('#second_scale_id').val(args[`frame${opened_frame}option3`]);
        }
        else{
          jQuery('#second_scale_id').val(null);
        }
      break;

      case 'spfa_rotate':
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id="second_rotate_id" type="number" name="Rotate" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option3`]||args[`frame${opened_frame}option3`]==0)){
          jQuery('#second_rotate_id').val(args[`frame${opened_frame}option3`]);
        }
        else{
          jQuery('#second_rotate_id').val(null);
        }
      break;

      case 'spfa_rotateX':
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id="second_rotateX_id" type="number" name="RotateX" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option3`]||args[`frame${opened_frame}option3`]==0)){
          jQuery('#second_rotateX_id').val(args[`frame${opened_frame}option3`]);
        }
        else{
          jQuery('#second_rotateX_id').val(null);
        }
      break;

      case 'spfa_rotateY':
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id="second_rotateY_id" type="number" name="RotateY" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option3`]||args[`frame${opened_frame}option3`]==0)){
          jQuery('#second_rotateY_id').val(args[`frame${opened_frame}option3`]);
        }
        else{
          jQuery('#second_rotateY_id').val(null);
        }
      break;

      case 'spfa_skewX':
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id="second_skewX_id" type="number" name="SkewX" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option3`]||args[`frame${opened_frame}option3`]==0)){
          jQuery('#second_skewX_id').val(args[`frame${opened_frame}option3`]);
        }
        else{
          jQuery('#second_skewX_id').val(null);
        }
      break;

      case 'spfa_skewY':
        jQuery("#second_spfa_dialog_effect_selection").append(`<div id="second_spfa_options_id">
          <input id="second_skewY_id" type="number" name="SkewY" min="0" max="5000"/>Degrees
          </div>`);

        if((args[`frame${opened_frame}effect2`]==select) && (args[`frame${opened_frame}option3`]||args[`frame${opened_frame}option3`]==0)){
          jQuery('#second_skewY_id').val(args[`frame${opened_frame}option3`]);
        }
        else{
          jQuery('#second_skewY_id').val(null);
        }
      break;

    }

  }  

  // create the editor box, pass the args through this function to generate_table function
  generate_box(args,left,top) {
    //remove the existing box on recall
    if (jQuery("#spfa_tabs_div").length > 0){
      //get the offset in order to reposition
      var box_offset = jQuery("#spfa_tabs_div").offset();
      jQuery( "#spfa_tabs_div" ).remove();
    }
    else{
      var box_offset = { top: top, left: left };
    }

    //create the body of the editor
    var tabs_div = document.createElement('div');
    tabs_div.setAttribute("id","spfa_tabs_div");
    tabs_div.style.top=`${box_offset.top}px`;
    tabs_div.style.left=`${box_offset.left}px`;
    var tab_buttons_div = document.createElement('div');
    tab_buttons_div.setAttribute("class","spfa_tab");
    var logo_div=document.createElement('IMG');
    logo_div.setAttribute("class","spfa_logo_tab");
    logo_div.setAttribute("src", `${spfa_ajax_params.pluginsLogo}`);
    logo_div.setAttribute("width", "90");
    logo_div.setAttribute("height", "35");
    var tab_button1 = document.createElement('button');
    var tab_button2 = document.createElement('button');
    tab_button1.setAttribute("class","spfa_tablinks");
    tab_button1.setAttribute("id","spfa_tab_button_1_id");
    tab_button1.textContent = " editor ";
    tab_button1.setAttribute("onclick", `classInstance.open_tab(event,"spfa_editor_box")`);
    tab_button2.setAttribute("class","spfa_tablinks");
    tab_button2.setAttribute("id","spfa_tab_button_2_id");
    tab_button2.textContent = " page animations ";
    tab_button2.setAttribute("onclick", `classInstance.open_tab(event,"page_animations")`);
    var box = document.createElement("div");
    var box2 = document.createElement("div");
    box.setAttribute("id","spfa_editor_box");
    box.setAttribute("class","spfa_tabcontent");
    box2.setAttribute("id","page_animations");
    box2.setAttribute("class","spfa_tabcontent");
    //create the list div
    var list_var=this.generate_list();
    //creates the selector label
    var selectror_div=document.createElement("div");
    selectror_div.setAttribute("id", "spfa_selector_div");
    selectror_div.textContent = "Element: ";
    //creates read only text for selector
    var ro_text=document.createElement("input");
    ro_text.setAttribute("id", "spfa_selector_text");
    ro_text.setAttribute("value",`${this.item_id}`);
    ro_text.disabled = true;
    //creates the trigger text-button div  
    var trigger_selector_div=document.createElement("div");
    trigger_selector_div.setAttribute("id", "spfa_trigger_selector_div");
    trigger_selector_div.textContent = "Trigger on: ";
    //creates read only text for trigger selector
    var trigger_input=document.createElement("input");
    trigger_input.setAttribute("id", "spfa_trigger_selector_text");
    trigger_input.setAttribute("value",`${args.trigger_item}`);
    trigger_input.disabled = true;
    //creates button for selecting trigger element
    var trigger_select_button=document.createElement("button");
    trigger_select_button.setAttribute("id", "spfa_trigger_selector_button_id");
    trigger_select_button.setAttribute("class", "spfa_trigger_selector_button");
    trigger_select_button.textContent='Select';
    trigger_select_button.onclick = function(){ 
                              // run the generate function
                              if(!jQuery('#spfa_trigger_instruction_box').length)
                                spfa_generate_trigger_instruction_box();
                             };
    //creates button for deleting trigger element
    var trigger_delete_button=document.createElement("button");
    trigger_delete_button.setAttribute("id", "spfa_trigger_selector_button_id");
    trigger_delete_button.setAttribute("class", "spfa_trigger_selector_button");
    trigger_delete_button.textContent='Delete';
    trigger_delete_button.onclick = function(){ 
                               // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.trigger_item = 'self_triggered'; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                              //change the text input
                              jQuery('#spfa_trigger_selector_text').val(args.trigger_item);

                             };
    //obsolete                         
    var frame_time_input=document.createElement("input");
    frame_time_input.setAttribute("id", "spfa_frame_time_input");
    frame_time_input.setAttribute("type",`number`);
    frame_time_input.setAttribute("min",`500`);
    frame_time_input.setAttribute("max",`10000`);
    frame_time_input.setAttribute("value",args.frame_time);
    frame_time_input.onchange = function(){ 
                              // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.frame_time = document.getElementById("spfa_frame_time_input").value; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                             };

    //creates radio boxes for choosing 'run on' option
    var radio_box = document.createElement("div");
    radio_box.setAttribute("id", "spfa_radio_box");
    radio_box.textContent="Effect will run:";

    var radioItem1 = document.createElement("input");
        radioItem1.type = "radio";
        radioItem1.name = "radioGrp";
        radioItem1.id = "spfa_rad1";
        radioItem1.value = "myradio1";
        radioItem1.defaultChecked = true;
        if (args.run_on=='window'){
          radioItem1.checked = true;
          // hide the trigger element option
          setTimeout(function(){ 
            jQuery('#spfa_trigger_selector_div').hide(); 
          }, 100);
        } 

        radioItem1.onclick = function(){ 
                              // hide trigger element
                              jQuery('#spfa_trigger_selector_div').hide();
                              // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.run_on = "window"; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                             };

    var group_div_radio_23 = document.createElement("div");
    group_div_radio_23.id = "spfa_group_radio_23";

    var radioItem2 = document.createElement("input");
        radioItem2.type = "radio";
        radioItem2.name = "radioGrp";
        radioItem2.id = "spfa_rad2";
        radioItem2.value = "myradio2";
        if (args.run_on=='mouse'){
          radioItem2.checked = true;
        } 
        radioItem2.onclick = function(){ 
                              //show trigger element
                              jQuery('#spfa_trigger_selector_div').show();
                              // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.run_on = "mouse"; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                             };

    var objTextNode1 = document.createTextNode("On window show");
    var objTextNode2 = document.createTextNode("On mouse over");
 
    var objLabel = document.createElement("label");
        objLabel.htmlFor = radioItem1.id;
        objLabel.appendChild(radioItem1);
        objLabel.appendChild(objTextNode1);
 
    var objLabel2 = document.createElement("label");
        objLabel2.htmlFor = radioItem2.id;
        objLabel2.appendChild(radioItem2);
        objLabel2.appendChild(objTextNode2);
         
        
        radio_box.appendChild(objLabel);
        radio_box.appendChild(objLabel2);
    
    //creates radio boxes for choosing 'run for' option
    var radio_box2 = document.createElement("div");
    radio_box2.setAttribute("id", "spfa_radio_box2");
    radio_box2.textContent="Repeat:";

    var radio2Item1 = document.createElement("input");
        radio2Item1.type = "radio";
        radio2Item1.name = "2radioGrp";
        radio2Item1.id = "spfa_rad1_1";
        radio2Item1.value = "2myradio1";
        radio2Item1.defaultChecked = true; 
        if (args.run_for=='once'){
          radio2Item1.checked = true;
        }
        radio2Item1.onclick = function(){ 
                              // hide the recover option
                              jQuery('#spfa_radio_box3').show(); 
                              jQuery('#spfa_radio_box2').css('margin-bottom','5px');           
                              // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.run_for = "once"; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                             };

    var radio2Item2 = document.createElement("input");
        radio2Item2.type = "radio";
        radio2Item2.name = "2radioGrp";
        radio2Item2.id = "spfa_rad2_2";
        radio2Item2.value = "2myradio2";
        if (args.run_for=='loop'){
          // hide the recover option
          setTimeout(function(){ 
            jQuery('#spfa_radio_box3').hide(); 
            jQuery('#spfa_radio_box2').css('margin-bottom','35px');
          }, 100);             
          radio2Item2.checked = true;
        }
        radio2Item2.onclick = function(){
                              // hide the recover option
                              jQuery('#spfa_radio_box3').hide(); 
                              jQuery('#spfa_radio_box2').css('margin-bottom','35px'); 
                              // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.run_for = "loop"; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                             };

    var obj2TextNode1 = document.createTextNode("once");
    var obj2TextNode2 = document.createTextNode("loop");
 
    var obj2Label = document.createElement("label");
        obj2Label.htmlFor = radio2Item1.id;
        obj2Label.appendChild(radio2Item1);
        obj2Label.appendChild(obj2TextNode1);
 
    var obj2Label2 = document.createElement("label");
        obj2Label2.htmlFor = radio2Item2.id;
        obj2Label2.appendChild(radio2Item2);
        obj2Label2.appendChild(obj2TextNode2);
         
        
        radio_box2.appendChild(obj2Label);
        radio_box2.appendChild(obj2Label2);

    //creates radio boxes for choosing 'recover' option
    var radio_box3 = document.createElement("div");
    radio_box3.setAttribute("id", "spfa_radio_box3");
    radio_box3.textContent="Recover:";

    var radio3Item1 = document.createElement("input");
        radio3Item1.type = "radio";
        radio3Item1.name = "3radioGrp";
        radio3Item1.id = "spfa_rad1_3";
        radio3Item1.value = "3myradio1";
        radio3Item1.defaultChecked = true; 
        if (args.recover_opt=='yes'){
          radio3Item1.checked = true;
        }
        radio3Item1.onclick = function(){ 
                              // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.recover_opt = "yes"; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                             };

    var radio3Item2 = document.createElement("input");
        radio3Item2.type = "radio";
        radio3Item2.name = "3radioGrp";
        radio3Item2.id = "spfa_rad2_3";
        radio3Item2.value = "3myradio2";
        if (args.recover_opt=='no'){
          radio3Item2.checked = true;
        }
        radio3Item2.onclick = function(){ 
                              // get the arguments
                              var args =  classInstance.browser_localstorage('get');
                              //modify the arguments
                              args.recover_opt = "no"; 
                              //save the modified arguments
                              classInstance.browser_localstorage('set',args);
                             };

    var obj3TextNode1 = document.createTextNode("yes");
    var obj3TextNode2 = document.createTextNode("no");
 
    var obj3Label = document.createElement("label");
        obj3Label.htmlFor = radio3Item1.id;
        obj3Label.appendChild(radio3Item1);
        obj3Label.appendChild(obj3TextNode1);
 
    var obj3Label2 = document.createElement("label");
        obj3Label2.htmlFor = radio3Item2.id;
        obj3Label2.appendChild(radio3Item2);
        obj3Label2.appendChild(obj3TextNode2);
        radio_box3.appendChild(obj3Label);
        radio_box3.appendChild(obj3Label2);    

    //creates the progress bar
    var bar_box = document.createElement("div");
    bar_box.setAttribute("id", "spfa_progress_bar_box");
    bar_box.textContent="Progress bar:";
    var bar = document.createElement("div");
    bar.setAttribute("id", "spfa_progress_bar");
    //appends box to page body
    document.body.appendChild(tabs_div);
    tabs_div.appendChild(tab_buttons_div);
    tab_buttons_div.appendChild(tab_button1);
    tab_buttons_div.appendChild(tab_button2);
    tab_buttons_div.appendChild(logo_div);
    tabs_div.appendChild(box);
    tabs_div.appendChild(box2);
    //appends selectors div to box
    box.appendChild(selectror_div);
    //appends selectors read only text to  div-box
    selectror_div.appendChild(ro_text);
    
    //appends radio boxes for run on to box
    box.appendChild(radio_box);
    //append trigger element divs
    //appends trigger selector label div to box
    box.appendChild(trigger_selector_div);
    //appends trigger element input to  div-box
    trigger_selector_div.appendChild(trigger_input);
    //and button
    trigger_selector_div.appendChild(trigger_select_button);
    trigger_selector_div.appendChild(trigger_delete_button);
    //continue with radio boxes
    box.appendChild(group_div_radio_23);
    group_div_radio_23.appendChild(radio_box2);
    group_div_radio_23.appendChild(radio_box3);
    //appends list div to box2
    box2.appendChild(list_var); 
    //appends progress bar
    bar_box.appendChild(bar);     
    //make box draggable
    jQuery( "#spfa_tabs_div" ).draggable();
    //--------------------------------------------------------------- 
    var tbl_label = document.createElement("div");
    tbl_label.setAttribute("id","spfa_tbl_label_id");
    tbl_label.textContent = " Frames sequence: ";
    // creates a wrapper div for <table> 
    var tbl_wrap = document.createElement("div");
    tbl_wrap.setAttribute("id", "spfa_wrapper_table_id");
    // creates a <table> element for frames
    var tbl = document.createElement("table");
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("id", "spfa_frame_table_id");
    //crete body for frame table
    //generate the frame table
    var row=this.generate_table(args);
    box.appendChild(tbl_label);
    // appends <table> into <body>
    box.appendChild(tbl_wrap);
    tbl_wrap.appendChild(tbl);
    // add the row to the end of the frame table body
    tbl.appendChild(row);

    //------------------------------------------------------ 
    //create body for buttons table
    // creates a <table> element for buttons
    var tbl_button = document.createElement("table");
    tbl_button.setAttribute("id", "spfa_table_button_id");
    tbl_button.setAttribute("class", "spfa_table_button_class");
    // creating all button cells
    // creates a table play,pause,stop button_row
    var button_row = document.createElement("tr");  
    for (var j = 0; j < 1; j++) {
      var button_cell = document.createElement("td");
      button_cell.setAttribute("class", "button_cell_style");
      //create buttons
      switch(j) {
        case 0:
          var button = document.createElement("button");
          button_cell.appendChild(button);
          button.setAttribute("id", "play_button");
          button.setAttribute("onclick", "classInstance.play_effect()");
          button.setAttribute("class", "spfa_button_style");
          button.textContent = 'PLAY';
          break; 
        default:
          // code block
        }
        button_row.appendChild(button_cell);
      }

    // add the play button row to the end of the frame table body
    tbl_button.appendChild(button_row);
    // appends <table> into <body>
    box.appendChild(tbl_button);
  ////////////////////////////////////////////////////////////////////
    // creates a table for save, close buttons
    var tbl_sub_button = document.createElement("table"); 
    tbl_sub_button.setAttribute("id","spfa_sub_table_id");
    tbl_sub_button.setAttribute("class","spfa_table_button_class");
    // creating all button cells
    // creates a table play,pause,stop button_row
    var sub_button_row = document.createElement("tr");  
    for (var j = 0; j < 3; j++) {
      var sub_button_cell = document.createElement("td");
      sub_button_cell.setAttribute("class","button_cell_style") 
      //create buttons
      switch(j) {
        case 0:
          var sub_button = document.createElement("button");
          sub_button_cell.appendChild(sub_button);
          sub_button.setAttribute("id", "save_button");
          sub_button.setAttribute("class", "spfa_button_style");
          sub_button.setAttribute("onclick", "classInstance.Save_effect()");
          sub_button.textContent = 'SAVE';
          break;
        case 1:
          var sub_button = document.createElement("button");
          sub_button_cell.appendChild(sub_button);
          sub_button.setAttribute("id", "delete_button");
          sub_button.setAttribute("class", "spfa_button_style");
          sub_button.setAttribute("onclick", "classInstance.delete_action()");
          sub_button.textContent = 'DELETE';
          break;
        case 2:
          var sub_button = document.createElement("button");
          sub_button_cell.appendChild(sub_button);
          sub_button.setAttribute("id", "delete_button");
          sub_button.setAttribute("class", "spfa_button_style");
          sub_button.setAttribute("onclick", "classInstance.delete_tab()");
          sub_button.textContent = 'CLOSE';
          break;

        default:
          // code block
        }
        sub_button_row.appendChild(sub_button_cell);
      }

    tbl_sub_button.appendChild(sub_button_row);
    // appends <table> into <body>
    box.appendChild(tbl_sub_button);
    this.init_tab();
    //zindex for be on top
    jQuery('#spfa_tabs_div').css('z-index','99999');  
  }

  //Create list rows
  generate_list(){
    var list = document.createElement("div");
    list.setAttribute("id","spfa_list_id");
    
    var data = {
      'action': 'spfa_php_ajax_responce_upload',
      'security': spfa_ajax_params.spfa_nonce,
      'page_url': window.location.href,

    };

    jQuery.post(spfa_ajax_params.ajaxurl, data, function(response) {
      if (response){
        var count=0;
        var array=JSON.parse(response.replace(/\\\\/g,''));
        array.forEach(function(element) {
          args=(JSON.parse(element.text_json));
          var list_row_text = args.item_id;
          
          var list_row = document.createElement("div");
          list_row.setAttribute("class", `spfa_list_row`);
          list_row.setAttribute("id", `spfa_list_row${count}`);
          
          var list_label=document.createElement('label');
          list_label.setAttribute("class", `spfa_list_label`);
          list_label.textContent=`"${list_row_text}"`;
          list_row.appendChild(list_label);

          var list_play_button = document.createElement("button");
          list_play_button.textContent="play";
          list_play_button.setAttribute('class','spfa_list_button');
          list_play_button.setAttribute('onclick',`classInstance.play_effect("${list_row_text}")`);
          list_row.appendChild(list_play_button);

          var list_show_button = document.createElement("button");
          list_show_button.textContent="show";
          list_show_button.setAttribute('class','spfa_list_button');
          list_show_button.setAttribute('onclick',`classInstance.show_element("${list_row_text}")`);
          list_row.appendChild(list_show_button);

          var list_del_button = document.createElement("button");
          list_del_button.textContent="delete";
          list_del_button.setAttribute('class','spfa_list_button');
          list_del_button.setAttribute('onclick',`classInstance.delete_row("spfa_list_row${count}","${list_row_text}")`);
          list_row.appendChild(list_del_button);

          list.appendChild(list_row);
          count++;        
        });
      }
    }); 
    return list;
  }

  //show element on mouseover at list tab
  show_element(selector){
    jQuery([document.documentElement, document.body]).animate({
        scrollTop: jQuery(`${selector}`).offset().top-100
    }, 1000);
    //turn on all effects
    jQuery.fx.off=false; 
    jQuery(`${selector}`).spfa_effect("spfa_highlight", {}, 1000).spfa_effect("spfa_highlight", {}, 1000).spfa_effect("spfa_highlight", {}, 1000);

  }
  
  delete_action(){
    localStorage.removeItem(this.item_id);
    //post for sql delete
    var data = {
      'action': 'spfa_php_ajax_responce_delete',
      'security': spfa_ajax_params.spfa_nonce,
      'delete_row': this.item_id
    };

    jQuery.post(spfa_ajax_params.ajaxurl, data, function(response) {    
    });

    classInstance.generate_box(classInstance.browser_localstorage('get')); 
  }
  //delete list row and sql delete row (for page animations list)
  delete_row(label_id,post_data){
    //front end delete
    document.getElementById(label_id).remove();
    localStorage.removeItem(post_data);
    //post for sql delete
    var data = {
      'action': 'spfa_php_ajax_responce_delete',
      'security': spfa_ajax_params.spfa_nonce,
      'delete_row': post_data
    };

    jQuery.post(spfa_ajax_params.ajaxurl, data, function(response) {    
    }); 
  }

  //function for initialise tab
  init_tab(){
    document.getElementById('spfa_editor_box').style.display = "block"; 
    document.getElementById('spfa_tab_button_1_id').className += " active";
  }

  //function for tab display
  open_tab(evt, tab_name) {
    // Declare all variables
    var i, tabcontent, tablinks, tablinks_active;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("spfa_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("spfa_tablinks");
    tablinks_active = document.getElementsByClassName("spfa_tablinks active");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    for (i = 0; i < tablinks_active.length; i++) {
      tablinks_active[i].className = tablinks_active[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab_name).style.display = "block";
    evt.currentTarget.className += " active";
    //recreate at editor open
    if(tab_name=='spfa_editor_box'){
      classInstance.generate_box(classInstance.browser_localstorage('get'));
    }
    
  } 

  //Take the args form generate_box and then create the frame table
  generate_table(args){
    // creates a table row
    var row = document.createElement("tr");
    row.setAttribute("id",'frame_row_id');
    if(args['frame_num']==0){
      args['frame_num']=1;
    }
    for (var j = 0; j < args['frame_num']; j++) {
      // Create a <td> element 
      var cell = document.createElement("td");
      cell.setAttribute("class", "spfa_af_cell_style"); 
      cell.setAttribute("id",`id_num${j}`);
      cell.setAttribute("onclick", `classInstance.create_dialog(${j})`);
      cell.setAttribute("style", "background-color: white;")
      // catch name of the effect for the label and set it as text
      if (`frame${j}effect` in args){
        //Add name , time label div and queue color
        var name_label = document.createElement("div");
        var second_name_label = document.createElement("div");
        name_label.textContent=args[`frame${j}effect`].replace('spfa_','');
        second_name_label.textContent=args[`frame${j}effect2`].replace('spfa_','');
        var time_label = document.createElement("div");
        time_label.textContent=args[`frame${j}msec`]+'ms';
        cell.appendChild(time_label);
        cell.appendChild(name_label);
        cell.appendChild(second_name_label);
        
      }
      row.appendChild(cell);
      
      //create the add frame cell
      if ((j == args['frame_num']-1)) {
        var cell_for_add = document.createElement("td");
        cell_for_add.setAttribute("class",'spfa_add_cell_style');
        cell_for_add.setAttribute("id",'spfa_add_cell');
        cell_for_add.textContent = "++";
        cell_for_add.setAttribute("onclick", "classInstance.add_cell()");
        row.appendChild(cell_for_add);
      }
    }
    return row;
  }

  //function to close the whole table
  delete_tab(){ 
    jQuery( "div" ).remove( "#spfa_tabs_div" );
    //close trigger selection if open
    if(jQuery( "#spfa_trigger_instruction_box").length){
      jQuery( "#spfa_trigger_instruction_box").remove();
      jQuery("body *").children().removeClass("spfa_trigger_mouseOn");
      spfa_generate_instruction_box();
    }
}

  //function to add a cell in the frame table
  add_cell(){
    var x = document.getElementById("spfa_frame_table_id").rows[0].cells.length;
    //check for limit 
    if(x>5){
      alert('no more than 5 frames in this version')
      return;
    }
    // get the arguments
    var args =  this.browser_localstorage('get');
    //modify the arguments
    args.frame_num = x; //no need to add because i also get the extra ++ cell_for_add
    //save the modified arguments
    this.browser_localstorage('set',args);
    //Regenerate the editor box
    this.generate_box(args);
  }
  
  //delete the cell and all the effects off the cell
  delete_cell(frame_num){
    // get the arguments
    var args =  this.browser_localstorage('get');
     //wont run if no effect
    if (!(args.frame0effect) && (args.frame_num==1)){
      return;
    }
    //delete effect and reduce the total number of frames
    delete args[`frame${frame_num}effect`];
    //reorder the frame num effects
    for (var i = frame_num; i < args.frame_num; i++) {
      args[`frame${i}effect`]= args[`frame${i+1}effect`];
      args[`frame${i}msec`]= args[`frame${i+1}msec`];
      args[`frame${i}effect2`]= args[`frame${i+1}effect2`];
      args[`frame${i}option1`]=args[`frame${i+1}option1`];
      args[`frame${i}option2`]=args[`frame${i+1}option2`];
      args[`frame${i}option3`]=args[`frame${i+1}option3`];
      args[`frame${i}option4`]=args[`frame${i+1}option4`];

      //delete the last in row
      if (i==args.frame_num-1){
        delete args[`frame${args.frame_num-1}effect`];
        delete args[`frame${args.frame_num-1}msec`];
        delete args[`frame${args.frame_num-1}effect2`];
        delete args[`frame${args.frame_num-1}option1`];
        delete args[`frame${args.frame_num-1}option2`];
        delete args[`frame${args.frame_num-1}option3`];
        delete args[`frame${args.frame_num-1}option4`];
      }
    }
    if(args.frame_num!=1){
      args['frame_num']-=1;
    }
    if(args.frame0queue='yes'){
      args.frame0queue='no'; 
    }
    //save the modified arguments
    this.browser_localstorage('set',args);
    //Regenerate the editor box
    this.generate_box(args);

  }

  //adding effects on the frame table
  add_effect(effect, frame_num, frame_msec, second_effect, option1, option2, option3, option4){
    // get the arguments
    var args =  this.browser_localstorage('get');
    //modify the arguments
    args[`frame${frame_num}effect`]=`${effect}`;
    args[`frame${frame_num}msec`]=`${frame_msec}`;
    args[`frame${frame_num}effect2`]=`${second_effect}`;
    args[`frame${frame_num}option1`]=option1;
    args[`frame${frame_num}option2`]=option2;
    args[`frame${frame_num}option3`]=option3;
    args[`frame${frame_num}option4`]=option4;
    //
    //save the modified arguments
    this.browser_localstorage('set',args);
    //Regenerate the editor box
    this.generate_box(args);
  }

  Save_effect(){
    var args = this.browser_localstorage('get');
    var data = {
      'action': 'spfa_php_ajax_responce_save',
      'security': spfa_ajax_params.spfa_nonce,
      'selector': this.item_id,
      'page_url': window.location.href,
      'effect_data': JSON.stringify(this.browser_localstorage('get')),
      'init_visibility':args.init_visibility
    };
    //check if it has been edit
    if (args.frame0effect){
      jQuery.post(spfa_ajax_params.ajaxurl, data, function(response) {
        location.reload(); 
      }); 
    }    
  }

  //Working with browser localstorage
  browser_localstorage(IO,args){
    //init memory if not present
    if (localStorage.getItem(`${this.item_id}`) === null) {
      var init_Object = { 
        'item_id': `${this.item_id}`,
        'trigger_item': 'self_triggered', 
        'frame_num': 1,
        'frame_time': 1000,
        'run_on': `window`, 
        'run_for': `once`,
        'recover_opt': `yes`,
        'init_pos': jQuery(this.item_id).position(),
        'init_width':jQuery(this.item_id).outerWidth(),
        'init_height':jQuery(this.item_id).outerHeight(),
        'init_color':jQuery(this.item_id).css("color"),
        'init_background_color':jQuery(this.item_id).css("background-color"),
        'init_fontsize':jQuery(this.item_id).css("font-size"),
        'init_margin_left' :jQuery(this.item_id).css("margin-left"),
        'init_margin_top' :jQuery(this.item_id).css("margin-top"),
        'init_visibility' : 'show',
        'init_display' : jQuery(this.item_id).css('display'),
        'init_opacity' : jQuery(this.item_id).css('opacity'),
        'init_css_position' : jQuery(this.item_id).css('position'),
        'spfa_flag' : ''
      };
      // Put the object into storage
      localStorage.setItem(`${this.item_id}`, JSON.stringify(init_Object));
    }

    if(IO=='get'){
      var retrievedObject = localStorage.getItem(`${this.item_id}`);
      var return_val = ('retrievedObject: ', JSON.parse(retrievedObject));
      return return_val;
    }
    if(IO=='set'){
      localStorage.setItem(`${this.item_id}`, JSON.stringify(args));
    }
  }

  //move progress bar
  bar_move() {
    //get the number of cells at frame table
    var x = document.getElementById("spfa_frame_table_id").rows[0].cells.length; 
    var elem = document.getElementById("spfa_progress_bar");   
    var width = 0;
    var width_range = 10*(x-1);//1 for the add cell
    var time_scale = 0.5;//need to calculate i am very tired right now
    var id = setInterval(frame, 10);
    
    function frame() {
      if (width >= width_range) {
        clearInterval(id);
      } else {
        width = width + time_scale; 
        elem.style.width = width + '%'; 
      }
    }
  }
  
  //Start collecting the effects and play the animation
  play_effect(item){
    
    var element='';
    //check if play button from list clicked
    if (item){
      element=item;
      var retrievedObject = localStorage.getItem(item);
      var args = JSON.parse(retrievedObject);
    }
    else{
      element=this.item_id;
    }
    //check flag
    if (jQuery(element).queue().length>0){
      return;
    }
    // get the arguments
    if (!item){
      var args =  this.browser_localstorage('get'); 
    } 
    //placeholder
    var placeholder_element=jQuery(element);
    jQuery.spfa_effects.createPlaceholder(placeholder_element);
    //zed index
    jQuery(element).css('z-index','99998');  
    //counter for ui effects comlete function
    var counter = 0;
    //then add all effects
    for (var i = 0; i < args.frame_num; i++) {

      var effect = args[`frame${i}effect`];
      var frame_time=Number(args[`frame${i}msec`]);
      //check for second effect
      if((args[`frame${i}effect2`]) && (args[`frame${i}effect2`]!="")){
        effect = args[`frame${i}effect2`];
        classInstance.dequeue_play(element,effect,frame_time,args,i)
        effect = args[`frame${i}effect`];
      } 

      jQuery(element).css( "transition", "none" );
      if (effect=='spfa_color'){ 
        jQuery(element).animate({color: args[`frame${i}option1`],backgroundColor: args[`frame${i}option2`]},frame_time);
      }

      else if(effect=='spfa_rotate'){
      jQuery(args.item_id).animate({ deg_rotate: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                  spfa_transform_array['rotate']=now;
                                                                                                  classInstance.do_transform_animation(element);
                                                                                                }});   
      }

      else if(effect=='spfa_rotateX'){
        jQuery(element).animate({ deg_rotateX: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                    spfa_transform_array['rotateX']=now;
                                                                                                    classInstance.do_transform_animation(element);
                                                                                                  }});   
      }

      else if(effect=='spfa_rotateY'){
        jQuery(element).animate({ deg_rotateY: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                    spfa_transform_array['rotateY']=now;
                                                                                                    classInstance.do_transform_animation(element);
                                                                                                  }});   
      } 

      else if(effect=='spfa_skewX'){
        jQuery(element).animate({ deg_skew_X: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                    spfa_transform_array['skewX']=now;
                                                                                                    classInstance.do_transform_animation(element);
                                                                                                  }});   
      }

      else if(effect=='spfa_skewY'){
        jQuery(element).animate({ deg_skew_Y: args[`frame${i}option1`] },{duration: frame_time,step:function(now){
                                                                                                    spfa_transform_array['skewY']=now;
                                                                                                    classInstance.do_transform_animation(element);
                                                                                                  }});   
      }

      else if(effect=='spfa_move'){
        jQuery(element).animate({ "margin-left": `+=${args[`frame${i}option1`]}px`,"margin-top": `+=${args[`frame${i}option2`]}px`},frame_time);
      }

      else if(effect=='spfa_scale'){
        var calc_width = `${args.init_width*(args[`frame${i}option1`]/100)}`;
        var calc_height = `${args.init_height*(args[`frame${i}option1`]/100)}`;
        var calc_fontsize = `${(parseInt(args.init_fontsize.replace('px','')))*(args[`frame${i}option1`]/100)}`;
        var current_width = parseInt(jQuery(element).css('width').replace('px',''));
        var current_margin_left =  parseInt(jQuery(element).css('margin-left').replace('px',''));
        var calc_margin_left = current_margin_left+(current_width - calc_width)/2;
        var current_height = parseInt(jQuery(element).css('height').replace('px',''));
        var current_margin_top =  parseInt(jQuery(element).css('margin-top').replace('px',''));
        var calc_margin_top = current_margin_top+(current_height - calc_height)/2;
        jQuery(element).css( "max-height", "none" );
        jQuery(element).css( "max-width", "none" );
        jQuery(element).animate({'width':calc_width,'height':calc_height,'fontSize': `${calc_fontsize}px`},{duration:frame_time});
      }
      //give a delay 
      else if(effect=='spfa_delay'){
        jQuery(element).delay(Number(args[`frame${i}msec`]))
      } 
      //fade in
      else if(effect=="spfa_fade_in"){
        jQuery(element).animate({'opacity':0},100);
        jQuery(element).animate({'opacity':1},frame_time);
      }  
      //fade out
      else if(effect=="spfa_fade_out"){
        jQuery(element).animate({'opacity':0},frame_time);
      }  
      //all jquery effects
      else{
        if(effect!=null){
          jQuery(element).spfa_effect( effect, {duration:frame_time} );
        }
      }
    }

    //recover option
    if (!(args.run_for=='once' && args.recover_opt=='no')){
      jQuery(element).queue(function(){classInstance.recover_from_play(args.item_id, Number(args.frame_time)) }) 
    }
    else{
      var temp_item = args.item_id;
      jQuery(args.item_id).queue(function(temp_item) {
        var placeholder_element=jQuery(temp_item);
        jQuery.spfa_effects.restoreStyle(placeholder_element,'absolute');
        jQuery.spfa_effects.removePlaceholder(placeholder_element);
        jQuery(args.item_id).dequeue();
      });  
    }
  }

  dequeue_play(element,effect,frame_time,args,i){
    jQuery(element).css( "transition", "none" )

    if (effect=='spfa_color'){
      jQuery(element).queue(function(){
        jQuery(element).dequeue();
        jQuery(element).animate({color: args[`frame${i}option3`],backgroundColor: args[`frame${i}option4`]},{duration:frame_time,queue:false});
      });  
    }

    else if(effect=='spfa_rotate'){
    jQuery(element).queue(function(){
      jQuery(element).dequeue();
      jQuery(element).animate({ deg_rotate: args[`frame${i}option3`] },{duration: frame_time,queue:false,step:function(now) {
                                                                                                               spfa_transform_array['rotate']=now;
                                                                                                               classInstance.do_transform_animation(element);
                                                                                                             }});
      }); 
    }

    else if(effect=='spfa_rotateX'){
      jQuery(element).queue(function(){
        jQuery(element).dequeue();
        jQuery(element).animate({ deg_rotateX: args[`frame${i}option3`] },{duration: frame_time,queue:false,step:function(now) {
                                                                                                                 spfa_transform_array['rotateX']=now;
                                                                                                                 classInstance.do_transform_animation(element);
                                                                                                               }});
      }); 
    }

    else if(effect=='spfa_rotateY'){
      jQuery(element).queue(function(){
        jQuery(element).dequeue();
        jQuery(element).animate({ deg_rotateY: args[`frame${i}option3`] },{duration: frame_time,queue:false,step:function(now) {
                                                                                                                 spfa_transform_array['rotateY']=now;
                                                                                                                 classInstance.do_transform_animation(element);
                                                                                                               }});
      }); 
    }

    else if(effect=='spfa_skewX'){
      jQuery(element).queue(function(){
        jQuery(element).dequeue();
        jQuery(element).animate({ deg_skew_X: args[`frame${i}option3`] },{duration: frame_time,queue:false,step:function(now) {
                                                                                                                 spfa_transform_array['skewX']=now;
                                                                                                                 classInstance.do_transform_animation(element);
                                                                                                               }});
      }); 
    }

    else if(effect=='spfa_skewY'){
      jQuery(element).queue(function(){
        jQuery(element).dequeue();
        jQuery(element).animate({ deg_skew_Y: args[`frame${i}option3`] },{duration: frame_time,queue:false,step:function(now) {
                                                                                                                 spfa_transform_array['skewY']=now;
                                                                                                                 classInstance.do_transform_animation(element);
                                                                                                               }});
      }); 
    }

    else if(effect=='spfa_move'){
      jQuery(element).queue(function(){
        jQuery(element).dequeue();
        jQuery(element).animate({ "margin-left": `+=${args[`frame${i}option3`]}px`,"margin-top": `+=${args[`frame${i}option4`]}px`},{duration:frame_time,queue:false});
      });  
    }

    else if(effect=='spfa_scale'){
      jQuery(element).css( "max-height", "none" );
      jQuery(element).css( "max-width", "none" );
      jQuery(element).queue(function(){
        jQuery(element).dequeue();
          var calc_width = `${args.init_width*(args[`frame${i}option3`]/100)}`;
          var calc_height = `${args.init_height*(args[`frame${i}option3`]/100)}`;
          var calc_fontsize = `${(parseInt(args.init_fontsize.replace('px','')))*(args[`frame${i}option3`]/100)}`;
          var current_width = parseInt(jQuery(args.item_id).css('width').replace('px',''));
          var current_margin_left =  parseInt(jQuery(args.item_id).css('margin-left').replace('px',''));
          var calc_margin_left = current_margin_left+(current_width - calc_width)/2;
          var current_height = parseInt(jQuery(args.item_id).css('height').replace('px',''));
          var current_margin_top =  parseInt(jQuery(args.item_id).css('margin-top').replace('px',''));
          var calc_margin_top = current_margin_top+(current_height - calc_height)/2;
          jQuery(element).animate({'width':calc_width,'height':calc_height,'fontSize': `${calc_fontsize}px`},{duration:frame_time,queue:false});
      }); 
    }

    else{
      if(effect!=null){
        jQuery(element).queue(function(){
          jQuery(element).dequeue();
          jQuery(element).spfa_effect( effect, {duration:frame_time,queue:false} );
        });
      }  
    }    
  }

  recover_from_play(element,frame_time){ 
    jQuery(element).dequeue();
    var retrievedObject = localStorage.getItem(element);
    var args = JSON.parse(retrievedObject);
    //recover visibillity 
    jQuery(args.item_id).animate({'opacity':1,},1000);
    
    //create table with all the effects
    var primary_and_secondary_effects_array= new Array();
    for (var i = 0; i < args.frame_num; i++) {
      if(!primary_and_secondary_effects_array.includes(args[`frame${i}effect`])){
        primary_and_secondary_effects_array.push(args[`frame${i}effect`]);
      }
      if(!primary_and_secondary_effects_array.includes(args[`frame${i}effect2`])){
        primary_and_secondary_effects_array.push(args[`frame${i}effect2`]);
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
    //check the table to see if recover is needed// also check if margin flag is true
    if(primary_and_secondary_effects_array.includes('spfa_color')
    || primary_and_secondary_effects_array.includes('spfa_move')
    || primary_and_secondary_effects_array.includes('spfa_scale')
    || primary_and_secondary_effects_array.includes('spfa_rotate')
    || primary_and_secondary_effects_array.includes('spfa_rotateX')
    || primary_and_secondary_effects_array.includes('spfa_rotateY')
    || primary_and_secondary_effects_array.includes('spfa_skewX')
    || primary_and_secondary_effects_array.includes('spfa_skewY')){
      if(all_to_zero){
        //remove placeholder and restore
        var placeholder_element=jQuery(args.item_id);
        jQuery.spfa_effects.restoreStyle(placeholder_element,args.init_css_position);
        jQuery.spfa_effects.removePlaceholder(placeholder_element);
      }
      else{
        setTimeout(function(){ 
                            //remove placeholder and restore
                            var placeholder_element=jQuery(args.item_id);
                            jQuery.spfa_effects.restoreStyle(placeholder_element,args.init_css_position);
                            jQuery.spfa_effects.removePlaceholder(placeholder_element);
                         },1000);
      }  
    }
    else{
      //remove placeholder and restore
      var placeholder_element=jQuery(element);
      jQuery.spfa_effects.restoreStyle(placeholder_element,args.init_css_position);
      jQuery.spfa_effects.removePlaceholder(placeholder_element);
    }
    //run all the effects in parallel recover
    primary_and_secondary_effects_array.forEach(function(item){
      if (item=='spfa_color'){
        jQuery(element).animate({'color':`${args.init_color}`,'backgroundColor':`${args.init_background_color}`},{duration: 1000,queue:false});
      }

      else if(item=='spfa_move'){
        jQuery(element).animate({ "margin-left": `${args.init_margin_left}`,"margin-top": `${args.init_margin_top}`},{duration: 1000,queue:false});
      }

      else if(item=='spfa_scale'){
        var current_width = parseInt(jQuery(element).css('width').replace('px',''));
        var current_margin_left =  parseInt(jQuery(element).css('margin-left').replace('px',''));
        var calc_margin_left = current_margin_left+(current_width - args.init_width)/2;
        var current_height = parseInt(jQuery(element).css('height').replace('px',''));
        var current_margin_top =  parseInt(jQuery(element).css('margin-top').replace('px',''));
        var calc_margin_top = current_margin_top+(current_height - args.init_height)/2;
        jQuery(element).animate({ 'width':`${args.init_width}px`,'height':`${args.init_height}px`,'fontSize':args.init_fontsize},{duration: 1000,queue:false});
      }

      else if(item=='spfa_rotate'){
        jQuery(element).animate({ deg_rotate: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                      spfa_transform_array['rotate']=now;
                                                                                      classInstance.do_transform_animation(element);
                                                                                    }});
      }

      else if(item=='spfa_rotateX'){
          jQuery(element).animate({ deg_rotateX: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                       spfa_transform_array['rotateX']=now;
                                                                                       classInstance.do_transform_animation(element);
                                                                                     }});
      }    

      else if(item=='spfa_rotateY'){
          jQuery(element).animate({ deg_rotateY: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                        spfa_transform_array['rotateY']=now;
                                                                                        classInstance.do_transform_animation(element);
                                                                                      }});
      }

      else if(item=='spfa_skewX'){
          jQuery(element).animate({ deg_skew_X: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                        spfa_transform_array['skewX']=now;
                                                                                        classInstance.do_transform_animation(element);
                                                                                      }});
      }

      else if(item=='spfa_skewY'){
          jQuery(element).animate({ deg_skew_Y: 0 },{duration: 1000,queue:false,step: function(now) {
                                                                                        spfa_transform_array['skewY']=now;
                                                                                        classInstance.do_transform_animation(element);
                                                                                      }});
      }
    });

  }
  
  do_transform_animation(element){
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
  
} 