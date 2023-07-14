
<?php
session_start();
if(isset($_POST['submit']))
{
 mysql_connect('localhost','root','watchnet','') or die(mysql_error());
 mysql_select_db('watchnet') or die(mysql_error());
 $name=$_POST['ID'];
 $pwd=$_POST['password'];
 if($name!=''&&$pwd!='')
 {
   $query=mysql_query("select * from login where name='".$name."' and password='".$pwd."'") or die(mysql_error());
   $res=mysql_fetch_row($query);
   if($res)
   {
    $_SESSION['name']=$name;
    header('location:welcome.php');
   }
   else
   {
    echo'You entered username or password is incorrect';
   }
 }
 else
 {
  echo'Enter both username and password';
 }
}
?>
