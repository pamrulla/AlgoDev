<?php if(!defined('ABSPATH')) {die('You are not allowed to call this page directly.');} ?>

<?php
  $products       = $group->products();
  $group_theme    = preg_replace('~\.css$~', '', (is_null($theme) ? $group->group_theme : $theme));
  $group_template = $group->group_template();
?>

<div class="mepr-price-menu <?php echo $group_theme; ?> <?php echo $group_template; ?>">
  <div class="mepr-price-boxes mepr-<?php echo count($products); ?>-col">
  <?php
    if(!empty($products)) {
        echo '<div class="row">';
          
      foreach($products as $product) {
        //MeprGroupsHelper::group_page_item($product, $group); ?>
            <div class="col-ms-4 col-sm-4 hestia-table-one">
                <div class="card card-pricing <?php echo $product->is_highlighted ? 'card-raised' : ''; ?> ">
                    <div class="content">
                        <h6 class="category"><?php echo $product->pricing_title ?></h6>
                        <h3 class="card-title"><?php 
                            //$price = MeprProductsHelper::format_currency($product, true, null, false);
                            echo '<small>INR</small>';
                            echo (int)($product->price);
                            $expire = '';
                            if($product->expire_after == 1) {
                                if($product->expire_unit == "months") {
                                    $expire = ' / month';
                                }
                                else if($product->expire_unit == "years") {
                                    $expire = ' / year';
                                }
                            }
                            else {
                                $expire = ' / '. $product->expire_after . ' ' . $product->expire_unit;
                            }
                            echo '<small> '. $expire .'</small>';
                            ?></h3>
                        <ul>
                            <?php
                                foreach($product->pricing_benefits as $bnft) {
                                    echo '<li>' . $bnft . '</li>';
                                }
                            ?>
                        </ul>
                        <?php
                            $url = "";
                            $isBought = false;
                            $user = MeprUtils::get_currentuserinfo();
                            if( $user && !$product->simultaneous_subscriptions &&
                                $user->is_already_subscribed_to($product->ID) &&
                                !empty($product->access_url) ) {
                                $url = $product->access_url;
                                $isBought = true;
                            }
                            else {
                                $url = $product->url();
                            }      
                        ?>
                        
                        <a href="<?php echo $url; ?>" class="btn <?php echo $isBought ? "btn-behance" : "btn-primary" ?>"><?php echo $isBought ? "View" : "Sign Up" ?></a>
                    </div>
                </div>
            </div>
      <?php }
        echo '</div>';
    }
  ?>
  </div>
</div>
