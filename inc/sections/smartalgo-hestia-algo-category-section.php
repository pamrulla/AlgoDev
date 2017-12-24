<?php
/**
 * Shop section for the homepage.
 *
 * @package Hestia
 * @since Hestia 1.0
 */

if ( ! function_exists( 'hestia_algo_category' ) ) :
	/**
	 * Shop section content.
	 *
	 * This function can be called from a shortcode too.
	 * When it's called as shortcode, the title and the subtitle shouldn't appear and it should be visible all the time,
	 * it shouldn't matter if is disable on front page.
	 *
	 * @since Hestia 1.0
	 * @modified 1.1.51
	 */
	function hestia_algo_category( $is_shortcode = false ) {

		// When this function is called from selective refresh, $is_shortcode gets the value of WP_Customize_Selective_Refresh object. We don't need that.
		if ( ! is_bool( $is_shortcode ) ) {
			$is_shortcode = false;
		}

		if ( true ) :

			$hestia_shop_subtitle = 'Choose category you want to learn';
			
			$hestia_shop_title = 'Algorithms & Data Structures';

			$wrapper_class   = $is_shortcode === true ? 'is-shortcode' : '';
			$container_class = $is_shortcode === true ? '' : 'container';

			hestia_before_shop_section_trigger();
			?>
			<section class="products section-gray <?php echo esc_attr( $wrapper_class ); ?>" id="products" data-sorder="hestia_shop">
				<?php hestia_before_shop_section_content_trigger(); ?>
				<div class="<?php echo esc_attr( $container_class ); ?>">
					<?php
					hestia_top_shop_section_content_trigger();
					if ( $is_shortcode === false ) {
					?>
						<div class="row">
							<div class="col-md-8 col-md-offset-2 text-center">
								<?php if ( ! empty( $hestia_shop_title ) || is_customize_preview() ) : ?>
									<h2 class="hestia-title"><?php echo esc_html( $hestia_shop_title ); ?></h2>
								<?php endif; ?>
								<?php if ( ! empty( $hestia_shop_subtitle ) || is_customize_preview() ) : ?>
									<h5 class="description"><?php echo wp_kses_post( $hestia_shop_subtitle ); ?></h5>
								<?php endif; ?>
							</div>
						</div>
						<?php
					}
					hestia_algo_category_content();
					?>
					<?php hestia_bottom_shop_section_content_trigger(); ?>
				</div>
				<?php hestia_after_shop_section_content_trigger(); ?>
			</section>
			<?php
			hestia_after_shop_section_trigger();
		endif;
	}

endif;


/**
 * Get content for shop section.
 *
 * @since 1.1.31
 * @modified 1.1.45
 * @access public
 */
function hestia_algo_category_content() {
	?>
	<div class="hestia-shop-content">
		<?php
		$terms = get_terms('topics');
        
        $colors = ['purple-gradient', 'peach-gradient', 'blue-gradient', 'green-gradient'];
        echo '<div class="row">';
			
        foreach($terms as $term) {
            
			$i = 1;
				?>
				<div class="col-ms-6 col-sm-6 col-md-3 shop-item algo-item">
                    <a href="<?php echo get_term_link($term->term_id); ?>">
					<div class="card text-white <?php echo $colors[mt_rand(0, count($colors)-1)]; ?>">
						<blockquote class="blockquote mb-0">
                            <h3><strong><?php echo $term->name; ?></strong></h3>
                        </blockquote>
					</div>
                    </a>
				</div>
				<?php
				if ( $i % 4 == 0 ) {
					echo '</div><!-- /.row -->';
					echo '<div class="row">';
				}
				$i ++;
		}
    
			echo '</div>';
		?>
	</div>
	<?php
}

if ( function_exists( 'hestia_algo_category' ) ) {
	$section_priority = apply_filters( 'hestia_section_priority', 20, 'hestia_algo_category' );
	add_action( 'hestia_sections', 'hestia_algo_category', absint( $section_priority ) );
}
