<?php
if ( !defined( 'ABSPATH' ) ) exit;

define( 'SMARTALGO_HESTIA_PHP_INCLUDE', trailingslashit( get_stylesheet_directory() ) . 'inc/' );

if ( !function_exists( 'hestia_child_parent_css' ) ){
    function hestia_child_parent_css() {
        wp_enqueue_style( 'hestia_child_parent', trailingslashit( get_template_directory_uri() ) . 'style.css', array( 'bootstrap' ) );
        if( is_rtl() ) {
            wp_enqueue_style( 'hestia_child_parent_rtl', trailingslashit( get_template_directory_uri() ) . 'style-rtl.css', array( 'bootstrap' ) );
        }
        
        if(is_page()){ //Check if we are viewing a 
            global $wp_query;
            $cat = wp_get_post_terms($wp_query->post->ID, 'topics');
            if(!empty($cat))
            {
                wp_enqueue_script('popper_script', 'https://unpkg.com/popper.js');
                wp_enqueue_script('d3_script', 'https://d3js.org/d3.v4.min.js', array( 'jquery' ), '', true);
                wp_enqueue_script('Properties_script', get_stylesheet_directory_uri() .'/js/common/Properties.js', array( 'd3_script' ),'', true);
                wp_enqueue_script('NodeText_script', get_stylesheet_directory_uri() .'/js/widgets/NodeText.js', array( 'd3_script' ),'', true);
                wp_enqueue_script('Node_script', get_stylesheet_directory_uri() .'/js/widgets/Node.js', array( 'd3_script' ),'', true);
                wp_enqueue_script('Connector_script', get_stylesheet_directory_uri() .'/js/widgets/Connector.js', array( 'd3_script' ),'', true);
                wp_enqueue_script('SingleState_script', get_stylesheet_directory_uri() .'/js/widgets/SingleState.js', array( 'd3_script' ),'', true);
                wp_enqueue_script($cat[0]->name.'_script', get_stylesheet_directory_uri() .'/js/'. $cat[0]->name .'.js', array( 'd3_script' ),'', true);
                wp_enqueue_script('Render_script', get_stylesheet_directory_uri() .'/js/common/Render.js', array( 'd3_script' ),'', true);
                wp_enqueue_script('EntryPoint_script', get_stylesheet_directory_uri() .'/js/common/EntryPoint.js', array( 'd3_script' ),'', true);
            }            
        }
    }
}
add_action( 'wp_enqueue_scripts', 'hestia_child_parent_css', 10 );

//hook into the init action and call create_topics_nonhierarchical_taxonomy when it fires
 
add_action( 'init', 'create_topics_nonhierarchical_taxonomy', 0 );
 
function create_topics_nonhierarchical_taxonomy() {
 
// Labels part for the GUI
 
  $labels = array(
    'name' => _x( 'Topics', 'taxonomy general name' ),
    'singular_name' => _x( 'Topic', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Topics' ),
    'popular_items' => __( 'Popular Topics' ),
    'all_items' => __( 'All Topics' ),
    'parent_item' => null,
    'parent_item_colon' => null,
    'edit_item' => __( 'Edit Topic' ), 
    'update_item' => __( 'Update Topic' ),
    'add_new_item' => __( 'Add New Topic' ),
    'new_item_name' => __( 'New Topic Name' ),
    'separate_items_with_commas' => __( 'Separate topics with commas' ),
    'add_or_remove_items' => __( 'Add or remove topics' ),
    'choose_from_most_used' => __( 'Choose from the most used topics' ),
    'menu_name' => __( 'Topics' ),
  ); 
 
// Now register the non-hierarchical taxonomy like tag
 
  register_taxonomy('topics','page',array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array( 'slug' => 'topic' ),
  ));
}

/*function add_taxonomies_to_pages() {
 register_taxonomy_for_object_type( 'topics', 'page' );
 }
add_action( 'init', 'add_taxonomies_to_pages' );*/

 if ( ! is_admin() ) {
 add_action( 'pre_get_posts', 'category_and_tag_archives' ); 
 }
 
function category_and_tag_archives( $wp_query ) {
$my_post_array = array('page');
 
 if ( $wp_query->get( 'topics' ) )
 $wp_query->set( 'post_type', $my_post_array );
 
}

function smartalgo_hestia_filter_features( $array ) {
    $files_to_load = array(
		'sections/smartalgo-hestia-algo-category-section',
	);

	if ( class_exists( 'WeDevs_Dokan' ) ) {
		array_push( $files_to_load, 'plugins-compatibility/dokan/functions' );
	}
	return array_merge(
		$array, $files_to_load
	);
}

add_filter( 'smartalgo_hestia_filter_features', 'smartalgo_hestia_filter_features' );

function smartalgo_hestia_include_features() {
    
	$hestia_allowed_phps = array();
	$hestia_allowed_phps = apply_filters( 'smartalgo_hestia_filter_features', $hestia_allowed_phps );

	foreach ( $hestia_allowed_phps as $file ) {
		$hestia_file_to_include = SMARTALGO_HESTIA_PHP_INCLUDE . $file . '.php';
        include_once( $hestia_file_to_include );
        if ( file_exists( $hestia_file_to_include ) ) {
			include_once( $hestia_file_to_include );
		}
        else
        {
            echo $hestia_file_to_include;
        }
	}
}

add_action( 'after_setup_theme', 'smartalgo_hestia_include_features', 0 );

