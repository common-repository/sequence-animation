<?php
/*
Plugin Name: Sequence animation
Plugin URI: 
Description: Animate your page elements by adding animation in sequence, click the 'Suquence animation' button on the admin bar and select the element to animate  
Version: 1.4
Author: Deimos Mavrozoumis
Author URI: https://plugfame.wordpress.com
*/
/*******************Include required files*******************/
wp_enqueue_script( 'jquery' );

//add table at activation
function spfa_animation_table_activation() {
  global $wpdb;
  $table_name = $wpdb->prefix . "spfa_animation_table";
  $charset_collate = $wpdb->get_charset_collate();

  $sql = "CREATE TABLE  $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    page_url text NOT NULL,
    selector text NOT NULL,
    text_Json text NOT NULL,
    init_visibility text NOT NULL,
    PRIMARY KEY  (id)
  ) $charset_collate;";
  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
  dbDelta( $sql );
}
register_activation_hook(__FILE__, 'spfa_animation_table_activation');

//remove table at deactivation
function spfa_animation_table__deactivation() {                    
  global $wpdb;
  $table_name= $wpdb->prefix . 'spfa_animation_table';
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);
}
register_deactivation_hook(__FILE__, 'spfa_animation_table__deactivation');

// attach main script and localize nonce
add_action( 'wp_enqueue_scripts', 'spfa_my_enqueue' );
function spfa_my_enqueue() {
	wp_enqueue_script( 'main_script', plugins_url( '/js/script.js', __FILE__ ), array('jquery') );
  wp_enqueue_script( 'spfa_effects_script', plugins_url( '/js/spfa_effects-md.js', __FILE__ ), array('jquery') );
	wp_enqueue_script( 'class_script', plugins_url( '/js/anim_editor_class.js', __FILE__ ), array('jquery') );
	wp_localize_script( 'main_script', 'spfa_ajax_params', array('spfa_nonce' => wp_create_nonce('spfa_ajax_nonce'),
                                                               'ajaxurl' => admin_url( 'admin-ajax.php' ),
                                                               'pluginsLogo' => plugins_url( 'cooltext333758638913341.png', __FILE__),
                                                               'init_hidden_elements' => spfa_set_element_initial_visibility() ));
  
  wp_enqueue_script( 'spectrum_color_script',  plugins_url('/js/spectrum.js', __FILE__ ), array('jquery') );
  wp_enqueue_script( 'tooltips_script', plugins_url('/js/tooltips.js', __FILE__ ), array('jquery') );
  wp_enqueue_script( 'selector_script',  plugins_url('/css-selector-generator-master/build/css-selector-generator.js', __FILE__ ), array('jquery') );
  //add all the avaliable effects  
  wp_enqueue_script( 'jquery-ui-dialog' );
  wp_enqueue_script( 'jquery-ui-draggable');
  wp_enqueue_script( 'jquery-ui-sortable');
  wp_enqueue_script( 'jquery-effects-core'); 
  wp_enqueue_style( 'wp-jquery-ui-dialog' );
  wp_enqueue_style( 'spectrum_color_style', plugins_url('/css/spectrum.css', __FILE__ )); 
  wp_enqueue_style( 'Editor_box_style', plugins_url('/css/style.css', __FILE__ )); 
                                                                                                                                
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function to hanndle the ajax post for save
add_action('wp_ajax_spfa_php_ajax_responce_save', 'spfa_php_ajax_responce_save');
add_action('wp_ajax_nopriv_spfa_php_ajax_responce_save', 'spfa_php_ajax_responce_save');

//function for initial elemant visibility
function spfa_set_element_initial_visibility(){
	global $wp;
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
  global $wpdb;
  $hidden_elements=array();
  $hidden_elements = $wpdb->get_results("SELECT selector FROM {$wpdb->prefix}spfa_animation_table WHERE init_visibility = 'hide' AND page_url='{$actual_link}'");
  return $hidden_elements;
}

function spfa_php_ajax_responce_save(){
  check_ajax_referer( 'spfa_ajax_nonce', 'security' );
  global $wpdb;
  //check if variable exists in table
  $selector = '"'.sanitize_text_field($_POST['selector']).'"';
  $count = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}spfa_animation_table WHERE selector = {$selector}");
  //if the selector not exists greate new row. else replace
  if ($count == 0 ){
  		  //insert values to a new row
	  $wpdb->insert($wpdb->prefix.'spfa_animation_table',
	  array(
	    'selector' => sanitize_text_field($_POST['selector']) , 
	    'text_Json' => sanitize_text_field($_POST['effect_data']),
	    'page_url' => esc_url($_POST['page_url']),
	    'init_visibility' => sanitize_text_field($_POST['init_visibility'])
	  ), 
	  array( 
	    '%s',
	    '%s',
	    '%s',
	    '%s' 
	  )  );
  }
  else{
    $myId = $wpdb->get_var("SELECT id FROM {$wpdb->prefix}spfa_animation_table WHERE selector = {$selector}");
    $wpdb->replace($wpdb->prefix.'spfa_animation_table',
		  array(
		    'id'=> $myId,
		    'selector' => sanitize_text_field($_POST['selector']) , 
		    'text_Json' => sanitize_text_field($_POST['effect_data']),
		    'page_url' => esc_url($_POST['page_url']),
		    'init_visibility' => sanitize_text_field($_POST['init_visibility'])
		  ), 
		  array( 
		    '%d',
		    '%s',
		    '%s',
		    '%s',
		    '%s'  
		  )  );
  }
  echo ('My id is '.$myId.' selector is  '.$selector.'  and count is '.$count);
  die;
}

//function to hanndle the ajax post for upload on page load

add_action('wp_ajax_spfa_php_ajax_responce_upload', 'spfa_php_ajax_responce_upload');
add_action('wp_ajax_nopriv_spfa_php_ajax_responce_upload', 'spfa_php_ajax_responce_upload');

function spfa_php_ajax_responce_upload(){
  check_ajax_referer( 'spfa_ajax_nonce', 'security' );
  $result = array();
  $page_url=esc_url($_POST['page_url']);
  global $wpdb;
  $text_json = $wpdb->get_results("SELECT text_json FROM {$wpdb->prefix}spfa_animation_table WHERE page_url='{$page_url}'");
  $text_json = json_encode($text_json);
  echo($text_json);
  die;
}

add_action('wp_ajax_spfa_php_ajax_responce_delete', 'spfa_php_ajax_responce_delete');
add_action('wp_ajax_nopriv_spfa_php_ajax_responce_delete', 'spfa_php_ajax_responce_delete');

function spfa_php_ajax_responce_delete(){
	check_ajax_referer( 'spfa_ajax_nonce', 'security' );
  global $wpdb;
  $wpdb->delete( $wpdb->prefix.'spfa_animation_table',
  array( 'selector' => sanitize_text_field($_POST['delete_row']) )  );
  echo('delete_ok');
  die;
}
//////////////////////////////////////////////////////---------admin----------------/////////////////////
//add plugin admin bar button
if (!is_admin()){
	add_action('admin_bar_menu','spfa_add_item',100);
}
//add page for database
add_action( 'admin_menu', function() {
  add_dashboard_page(
      __( 'spfa_Welcome', 'textdomain' ),
      __( 'spfa_Welcome', 'textdomain' ),
      'manage_options',
      'spfa_my-welcome',
      'spfa_display_database'
  );
});
add_action( 'admin_head', function() {
  remove_submenu_page( 'index.php', 'spfa_my-welcome' );
});

add_filter( 'plugin_action_links_' . 'sequence-animation/index.php', 'spfa_plugin_action_links');


/* code to add menu on admin bar */
function spfa_add_item( $admin_bar ){
  if ( current_user_can( 'manage_options' ) ) {
    global $wp_admin_bar;
    $wp_admin_bar->add_menu( array(
      'id'    => 'fa_animation',
      'title' => '<span class="ab-icon dashicons dashicons-playlist-video"></span>' . _( 'Sequence animation' ),
    ) );
  }

}

function spfa_plugin_action_links($links) {
	
  $links = array_merge( array(
   '<a href="' . esc_url( admin_url( '/?page=spfa_my-welcome' ) ) . '">' . __( 'Database', 'textdomain' ) . '</a>'
  ), $links );
  return $links;
}

function spfa_display_database(){
  global $wpdb;
  $result = $wpdb->get_results("SELECT page_url, selector FROM {$wpdb->prefix}spfa_animation_table"); 
  $html = "<h1 style='text-align:center'>List of all animated elements fo sequence animation plugin</h1>";   
  $html .= "<table id='spfa_database_table' style='margin: 50px; width:90%'>";
  $html .="<tr>";
  $html .="<th style='background-color:#669999; border: 1px solid black;padding: 5px;'>Page</th>";
  $html .="<th style='background-color:#669999; border: 1px solid black;padding: 5px;'>Element</th>";
  $html .="</tr>";   
  foreach($result as $r){
    $html .="<tr>";
    $count=1;
    foreach ($r as $d){
      if($count==1){
        $html .="<td style='border-bottom: 1px solid black;padding: 5px;'>"."<a href='".esc_url($d)."'>".esc_url($d)."</a>"."</td>";
        $count=2;  
      }
      elseif($count==2){
        $html .="<td style='border-bottom: 1px solid black;padding: 5px;'>".esc_html($d)."</td>";
      }
    }
    $html .="</tr>";
  }
  $html .="</table>";
  echo $html;
} 