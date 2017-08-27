<?php

class UserController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $formUser = new Application_Form_User();

        $this->view->form = $formUser;

        
    }

    public function showAction()
    {
       // $this->_helper->viewRenderer->setNoRender();
        $userTable = new Zend_Db_Table('tblUsers');
        $rawUser = $userTable->fetchAll();
        $users = $rawUser->toArray();
        $this->view->users = $users;
    }

    public function addAction()
    {
        $userTable = new Zend_Db_Table('tblUsers');
        if(isset($_POST)){
            var_dump($_POST);
            $userTable->insert($_POST);
        }
    }


}





