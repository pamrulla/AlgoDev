<?php /* Template Name: ComingSoon */ ?>
<?php get_header(); ?>
<script type="text/javascript">
    var typename = '<?php echo the_title(); ?>';
    <?php 
    $terms = get_the_terms(get_the_ID(), 'topics');
    ?>
    window['topic'] = '<?php echo $terms[0]->name; ?>';
    window['typename'] = typename;
</script>
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
            <div class="container">
                <div class="row" style="margin: 30px;">
                    <div class="col-md-12 text-center">
                        <h1>Coming Soon...</h1>
            </div></div></div>
	</div>
</div>


<?php get_footer(); ?>
