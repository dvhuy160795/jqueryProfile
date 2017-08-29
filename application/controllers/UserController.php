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
        $users = $this->showAction();
        $this->view->form = $formUser;
        $this->view->users = $users;
        
    }

    public function showAction()
    {
        
        $userTable = new Zend_Db_Table('tblUsers');

        $rawUser = $userTable->fetchAll();
        $users = $rawUser->toArray();
        return $users;
    }

    public function addAction()
    {
        $userForm = new Application_Form_User();
        $userTable = new Zend_Db_Table('tblUsers');
        $userSubmitForm = $this->getRequest()->isPost();

        if (!$userSubmitForm) {
            $this->getResponse()->setHttpResponseCode(400);
            return $this->_helper->json([
                'message' => 'Add user support POST method only',
                'data' => []
            ]);
        }

        $isValidUserData = $userForm->isValid($this->getRequest()->getPost());
        $nameErr = $userForm->name->getMessages();
        $ageErr = $userForm->age->getMessages();
        
        if($isValidUserData){
            $filteredUser = $userForm->getValues();
            unset($filteredUser['idUser']);
            $userId = $userTable->insert($filteredUser);
            $filteredUser['id'] = $userId;
            return $this->_helper->json($filteredUser);
        }

        $this->getResponse()->setHttpResponseCode(400);
        $this->_helper->json([
            'message' => 'Invalid user form data',
            'data' => $userForm->getMessages()
        ]);
    }

    public function updateAction()
    {
        $userForm = new Application_Form_User();
        $userTable = new Zend_Db_Table('tblUsers');

        $userSubmitForm = $this->getRequest()->isPost();
        
        
        if (!$userSubmitForm) {
            $this->getResponse()->setHttpResponseCode(400);
            return $this->_helper->json([
                'message' => 'Update must be method Post',
                'data' => []
            ]);
        }
        
        $isInValidUser = !$userForm->isValid($this->getRequest()->getPost());
        
        if ($isInValidUser) {
            $this->getResponse()->setHttpResponseCode(400);
            return $this->_helper->json([
                'message' => 'invalid form data',
                'data' => $userForm->getMessages()
            ]);
        }
        
        $filteredUser = $userForm->getValues();
        $dataPostForm = $this->getRequest()->getPost();
        unset($filteredUser['idUser']);
        $userId = $dataPostForm['id'];
        $userTable->update($filteredUser,['id = ?' => $userId]);
        $this->_helper->json($dataPostForm);
    }
}







