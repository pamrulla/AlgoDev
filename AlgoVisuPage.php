<?php /* Template Name: AlgoVisu */ ?>
<?php get_header(); ?>
<script type="text/javascript">
    var typename = '<?php echo the_title(); ?>';
    <?php 
    $terms = get_the_terms(get_the_ID(), 'topics');
    ?>
    window['topic'] = '<?php echo $terms[0]->name; ?>';
    window['typename'] = typename;
</script>
<h1>Khan</h1>
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
            <div class="row">
                <div id="sim-area" class="text-center">

                </div>
            </div>
            <div class="row">
                <div id="controls-area" class="text-center">
                    <div class="player text-center">
                        <button type="button" id="button_fbw" class="btn" onclick='buttonRewindPress()'>
                          <i class="fa fa-fast-backward"></i>
                        </button>

                        <button type="button" id="button_bw" class="btn" onclick='buttonBackPress()'>
                          <i class="fa fa-backward"></i>
                        </button>

                        <button type="button" id="button_play" class="btn" onclick='buttonPlayPress()'>
                          <i class="fa fa-play"></i>
                        </button>

                        <button type="button" id="button_stop" class="btn" onclick='buttonStopPress()'>
                          <i class="fa fa-stop"></i>
                        </button>

                        <button type="button" id="button_fw" class="btn" onclick='buttonForwardPress()'>
                          <i class="fa fa-forward"></i>
                        </button>

                        <button type="button" id="button_ffw" class="btn" onclick='buttonFastforwardPress()'>
                          <i class="fa fa-fast-forward"></i>
                        </button>    
                      </div>
                </div>
            </div>
		</div>
	</div>
</div>


<?php get_footer(); ?>
