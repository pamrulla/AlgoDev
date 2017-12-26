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
<!-- Modal -->
<div class="modal fade" id="actionModal" tabindex="-1" role="dialog" aria-labelledby="actionModalLabel">
  <div class="modal-dialog modal-sm1" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="actionModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        <form id="actionModalForm">
            
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" id="actionModalButton" data-dismiss="modal" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<div class="<?php echo hestia_layout(); ?>">
	<div class="blog-post <?php esc_attr( $class_to_add ); ?>">
		<div class="container-fluid">
            <div class="row">
                <div id="sim-area" class="text-center">

                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <div class="dropup">
                      <button class="btn btn-default dropdown-toggle" type="button" id="actionsdropup" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Actions
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu" id="actionsdropup-list" aria-labelledby="actionsdropup">
                        <!--<li><a href="#">Create</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Separated link</a></li>-->
                      </ul>
                    </div>
                </div>
                <div class="col-md-10">
                    <div id="controls-area" class="text-center">
                    <div class="player">
                        
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
</div>


<?php get_footer(); ?>
