<?php
require_once('passwordLibClass.php');

if (!function_exists('password_hash'))
{
    function password_hash($password, $algo=PASSWORD_DEFAULT, $options=array())
	{
        $crypt = NEW Antnee\PhpPasswordLib\PhpPasswordLib;
        $crypt->setAlgorithm($algo);
        
        $debug  = isset($options['debug'])
                ? $options['debug']
                : NULL;
        
        $password = $crypt->generateCryptPassword($password, $options, $debug);
        
        return $password;
    }
}

if (!function_exists('password_verify')){
    function password_verify($password, $hash){
        return (crypt($password, $hash) === $hash);
    }
}

if (!function_exists('password_needs_rehash')){
    function password_needs_rehash($hash, $algo, $options=array()){
        $crypt = NEW Antnee\PhpPasswordLib\PhpPasswordLib;
        return !$crypt->verifyCryptSetting($hash, $algo, $options);
    }
}

if (!function_exists('password_get_info')){
    function password_get_info($hash){
        $crypt = NEW Antnee\PhpPasswordLib\PhpPasswordLib;
        return $crypt->getInfo($hash);
    }
}