<?php /* Template Name: AlgoVisu */ ?>
<?php get_header(); ?>
	<div id="primary" class="<?php echo hestia_boxed_layout_header(); ?> page-header header-small">
		<?php
		if ( ( class_exists( 'WooCommerce' ) && ! is_cart() && ! is_checkout() ) || ! class_exists( 'WooCommerce' ) ) {
		?>
		<div class="container">
			<div class="row">
				<div class="col-md-10 col-md-offset-1 text-center">
					<?php single_post_title( '<h1 class="hestia-title">', '</h1>' ); ?>
				</div>
			</div>
		</div>
		<?php
		}
		hestia_output_wrapper_header_background( false );
		?>
	</div>
</header>
<div class="<?php echo hestia_layout(); ?>">
	<div class="blog-post <?php esc_attr( $class_to_add ); ?>">
		<div class="container-fluid">
            <div id="sim-area" class="text-center">
            </div>
		</div>
	</div>
</div>
<?php get_footer(); ?>
