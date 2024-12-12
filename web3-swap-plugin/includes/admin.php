<?php

function web3_swap_plugin_settings() {
    add_menu_page(
        'Web3 Swap Settings',
        'Web3 Swap',
        'manage_options',
        'web3-swap-plugin',
        'web3_swap_settings_page',
        'dashicons-admin-generic'
    );
}

function web3_swap_settings_page() {
    ?>
    <div class="wrap">
        <h1>Web3 Swap Plugin Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('web3_swap_options_group');
            do_settings_sections('web3_swap_plugin');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}
add_action('admin_menu', 'web3_swap_plugin_settings');
