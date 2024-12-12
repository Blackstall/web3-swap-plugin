<?php
/**
 * Plugin Name: Web3 Swap Plugin
 * Description: A Web3 token swap interface for WordPress.
 * Version: 1.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Enqueue assets (CSS and JS)
function web3_swap_enqueue_assets() {
    wp_enqueue_style('web3-swap-style', plugin_dir_url(__FILE__) . 'assets/css/style.css');
    wp_enqueue_script('web3-swap-script', plugin_dir_url(__FILE__) . 'assets/js/app.js', array('jquery'), null, true);

    // Pass AJAX URL and plugin settings to JS
    wp_localize_script('web3-swap-script', 'web3SwapData', array(
        'ajax_url' => admin_url('admin-ajax.php'),
    ));
}
add_action('wp_enqueue_scripts', 'web3_swap_enqueue_assets');

// Add admin menu
include plugin_dir_path(__FILE__) . 'includes/admin.php';

// Register shortcode for the swap interface
function web3_swap_shortcode() {
    ob_start();
    ?>
    <div id="web3-swap-container">
        <button id="connect-wallet-button">Connect Wallet</button>
        <div id="swap-interface">
            <input type="number" id="amount" placeholder="Amount" />
            <button id="swap-button">Swap</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('web3_swap', 'web3_swap_shortcode');
