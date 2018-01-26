<?php /* Template Name: AlgoVisuFree */ ?>
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
      <div class="modal-header"  style="background-color: lightcoral;">
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

<?php $page_id = get_the_ID();
$page_object = get_page( $page_id );
$cnt = $page_object->post_content;
?>

<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel">
  <div class="modal-dialog modal-sm1" role="document" style="overflow-y: initial !important">
    <div class="modal-content">
      <div class="modal-header" style="background-color: lightcoral;">
        <h4 class="modal-title" id="actionModalLabel"><?php echo get_the_title(); ?></h4>
      </div>
      <div class="modal-body" style="height: 250px; overflow-y: auto;">
            <?php echo $cnt; ?>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel">
  <div class="modal-dialog modal-sm1" role="document">
    <div class="modal-content">
      <div class="modal-header" style="background-color: lightcoral;">
        <h4 class="modal-title">Invalid Input</h4>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger" role="alert" id="errorModalForm">
            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<?php 
    $colors = ["purple-gradient", "peach-gradient", "blue-gradient", "green-gradient"];
    $content = '<div class="container-fluid"><div class="row"><div id="sim-area" class="text-center"></div></div><div class="row"><div class="text-center"><div class="card text-center text-white ';
    $content .= $colors[mt_rand(0, count($colors)-1)];
    $content .= '" style="width: 320px;"><em id="state-comment">';
    $content .= get_the_title();

$content .= '</em></div></div></div>';
$content .= '<div class="row">';
    $content .= '<div class="col-sm-4">';
        $content .= '<div class="dropup">';
            $content .= '<button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="actionsdropup" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i class="fa fa-bars"></i></button>';
            $content .= '<ul class="dropdown-menu" id="actionsdropup-list" aria-labelledby="actionsdropup"></ul>';
            $content .= '<a href="https://github.com/smartgnan/Smart-Algo-Downloads/tree/master/'. $terms[0]->name .'" target="_blank" class="btn btn-sm btn-instagram"><i class="fa fa-download"></i></a>';
            if($cnt != "") {
              $content .= '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#infoModal"><i class="fa fa-info"></i></button>';
            }
        $content .= '</div>';
    $content .= '</div>';
    $content .= '<div class="col-sm-8">';
        $content .= '<div id="controls-area" class="text-center1">';
            $content .= '<div class="player">';
                $content .= '<button type="button" id="button_fbw" class="btn btn-sm btn-rose btn-simple1" onclick="buttonRewindPress()"><i class="fa fa-fast-backward"></i></button>';
                $content .= '<button type="button" id="button_bw" class="btn btn-sm btn-dribbble btn-simple1" onclick="buttonBackPress()"><i class="fa fa-backward"></i></button>';
                $content .= '<button type="button" id="button_play" class="btn btn-sm btn-facebook btn-simple1" onclick="buttonPlayPress()"><i class="fa fa-play"></i></button>';
                $content .= '<button type="button" id="button_stop" class="btn btn-sm btn-youtube btn-simple1" onclick="buttonStopPress()"><i class="fa fa-stop"></i></button>';
                $content .= '<button type="button" id="button_fw" class="btn btn-sm btn-twitter btn-simple1" onclick="buttonForwardPress()"><i class="fa fa-forward"></i></button>';
                $content .= '<button type="button" id="button_ffw" class="btn btn-sm btn-linkedin btn-simple1" onclick="buttonFastforwardPress()"><i class="fa fa-fast-forward"></i></button>';
            	$content .= '<div style="display: inline-block; position:relative" class="dropup"><a href="#!" type="button" class="btn btn-youtube dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span id="speedValue">1x</span> <span class="caret"></span></a>';
                    $content .= '<ul class="dropdown-menu" role="menu" style="min-width: 0px;">';
                    $content .= '<li><a href="#!" onclick="processSpeed(2);">2x</a></li>';
                    $content .= '<li><a href="#!" onclick="processSpeed(1.5);">1.5x</a></li>';
                    $content .= '<li><a href="#!" onclick="processSpeed(1);">1x</a></li>';
                    $content .= '<li><a href="#!" onclick="processSpeed(0.5);">0.5x</a></li>';
                    $content .= '<li><a href="#!" onclick="processSpeed(0.25);">0.25x</a></li>';
                    $content .= '</ul></div>';
                $content .= '</div>';
        $content .= '</div>';
    $content .= '</div>';
$content .= '</div>';
$content .= '</div>';
?>

<div class="<?php echo hestia_layout(); ?>">
	<div class="blog-post <?php esc_attr( $class_to_add ); ?>">
            <?php echo $content; ?>    
            <div class="row">
                <div class="col-md-12">
                <?php do_action( 'hestia_blog_social_icons' ); ?>
                </div>
            </div>
	</div>
</div>


<?php get_footer(); ?>
