<?php

$default_blog_layout        = hestia_sidebar_on_single_post_get_default();
$hestia_blog_sidebar_layout = get_theme_mod( 'hestia_blog_sidebar_layout', $default_blog_layout );

$args                 = array(
	'sidebar-right' => 'col-md-8 archive-post-wrap',
	'sidebar-left'  => 'col-md-8 archive-post-wrap',
	'full-width'    => 'col-md-10 col-md-offset-1 archive-post-wrap',
);
$hestia_sidebar_width = get_theme_mod( 'hestia_sidebar_width', 25 );
if ( $hestia_sidebar_width > 3 && $hestia_sidebar_width < 80 ) {
	$args['sidebar-left'] .= ' col-md-offset-1';
}

$class_to_add = hestia_get_content_classes( $hestia_blog_sidebar_layout, 'sidebar-1', $args );

get_header();
?>
	<div id="primary" class="<?php echo hestia_boxed_layout_header(); ?> page-header header-small">
		<div class="container">
			<div class="row">
				<div class="col-md-10 col-md-offset-1 text-center">
					<?php the_archive_title( '<h1 class="hestia-title">', '</h1>' ); ?>
					<?php the_archive_description( '<h5 class="description">', '</h5>' ); ?>
				</div>
			</div>
		</div>
		<?php hestia_output_wrapper_header_background(); ?>
	</div>
</header>
<div class="<?php echo hestia_layout(); ?>">
<div class="home">
<section class="products" id="products" data-sorder="hestia_shop">
	<div class="container">			
        <div class="hestia-shop-content">
        <?php
        
        $colors = ['purple-gradient', 'peach-gradient', 'blue-gradient', 'green-gradient'];
        
        if(have_posts()) {
            
			$i = 1;
			echo '<div class="row">';
            while ( have_posts() ) {
                the_post();
        ?>
				<div class="col-ms-6 col-sm-6 col-md-3 text-center shop-item algo-item">
                    <a href="<?php echo get_the_permalink(); ?>">
					<div class="card text-white <?php echo $colors[mt_rand(0, count($colors)-1)]; ?>">
						<blockquote class="blockquote mb-0">
                            <h3><strong><?php echo the_title(); ?></strong></h3>
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
		}
        else {
		  get_template_part( 'template-parts/content', 'none' );
        }
					
		?>
        </div>
    </div>
</section>
</div>
</div>
	<?php get_footer(); ?>
