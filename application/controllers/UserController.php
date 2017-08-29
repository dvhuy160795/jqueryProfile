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
        $userTable = new Zend_Db_Table('tblUsers');

        $rawUser = $userTable->fetchAll();
        $users = $rawUser->toArray();
        
        $isUserPostData = $this->getRequest()->isPost();
        if($isUserPostData){
            $dataUserPost = $this->getRequest()->getPost();
            $isValidUserData = $formUser->isValid($dataUserPost);
            
            if($isUserPostData){
                // xử lý form
            }
        }
        $this->view->form = $formUser;
        $this->view->users = $users;
        
    }

    public function showAction()
    {
       // $this->_helper->viewRenderer->setNoRender();
       
    }

    public function addAction()
    {
        $this->processProfile('insert');
    }

    public function updateAction()
    {
        $this->processProfile("update");
    }

    public function processProfile($processMethod){
        $formUser = new Application_Form_User();
        $userTable = new Zend_Db_Table('tblUsers');

        if(isset($_POST)){
            $isValidUserData = $formUser->isValid($_POST);
            $nameErr = $formUser->name->getMessages();
            $ageErr = $formUser->age->getMessages();

            $defineMessages = [
                    'success' => true,
                    'err' =>[
                        'tdNameErr' => [],
                        'tdAgeErr' => [],
                    ]
            ];
            
            if($isValidUserData){
                $this->actionProcessProFile($processMethod,$_POST,$userTable,$defineMessages);
            }else{
                $defineMessages['success'] = false;
                /* set message error by jquery */
                $err = [
                    'tdNameErr' => [],
                    'tdAgeErr' => [],
                ];
                if(!empty($nameErr)){
                    $err['tdNameErr']= $nameErr;
                }
                if(!empty($ageErr)){
                    $err['tdAgeErr']= $ageErr;
                }
                $defineMessages['err'] = $err;
            }
           
        echo json_encode($defineMessages);
        }   
    }
    protected function actionProcessProFile($processMethod,$dataForm,$userTable,&$defineMessages){
        switch(strtolower($processMethod)){
            case "insert":
                $lastInsertId = $userTable->insert($dataForm);
                $defineMessages['lastInsertId'] = $lastInsertId;
            break;
            case "update":
                $id = $dataForm['id'];
                unset($dataForm['id']);
                $userTable->update($dataForm,["id = ?"=>$id]);
            break;
        }
    }

}







