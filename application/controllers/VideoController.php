<?php

class VideoController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $videoForm = new Application_Form_Video();
        $videoTable = new Zend_Db_Table('videos');

        $dataProfileVideos = $videoTable->fetchAll();
        $videos = $dataProfileVideos->toArray();
        $this->view->videos = $videos;
        $this->view->videoForm = $videoForm;
    }

    public function getErrFormAction()
    {
        $videoForm = new Application_Form_Video();
        $videoTable = new Zend_Db_Table('videos');
        
        $clientPostForm = $this->getRequest()->isPost();
         
        if($clientPostForm){
            $dataFormPosted = $this->getRequest()->getPost();
            $isValidVideoForm = $videoForm->isValid($dataFormPosted);
            $nameErr = $videoForm->name->getMessages();
            $userErr = $videoForm->user->getMessages();
            $listMessage = ['success'=> true];
            $listErr = [
                    'listErrName' =>[],
                    'listErrUser' =>[],
                ];
            if($isValidVideoForm){
                $videoTable->insert($dataVideo = $videoForm->getValues());
            }else{
                
                if(!empty($nameErr)){
                    $listErr['listErrName'] = $nameErr;
                }
                if(!empty($userErr)){
                    $listErr['listErrUser'] = $userErr;
                }
                $listMessage['success'] = false;
               // echo json_encode($listErr);
            }
                $listMessage['listErr'] = $listErr;
            echo json_encode($listMessage);
        
        }
    }
    public function deleteAction()
    {
        $videoTable = new Zend_Db_Table('videos');

        $videoTable->delete('1');
    }


}





