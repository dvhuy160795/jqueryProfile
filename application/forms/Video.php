<?php

class Application_Form_Video extends Zend_Form
{

    public function init()
    {
        $videoName = new Zend_Form_Element_Text('name');
        $videoName->setLabel('Video Name')
                  ->setRequired(true);
        $videoName->addValidator('NotEmpty')
                    ->getValidator('NotEmpty')
                    ->setMessage('Video name must not is empty!!');
        
        $videoUser = new  Zend_Form_Element_Text('user');
        $videoUser->setLabel('Video User Upload')
                  ->setRequired(true);
        $videoUser->addValidator('NotEmpty')
                    ->getValidator('NotEmpty')
                    ->setMessage('Video user upload must not is empty!!'); 
        $videoUser->addValidator('Int')
                    ->getValidator('Int')
                    ->setMessage('Video user upload must is integer!!'); 
        $videoSubmit = new Zend_Form_Element_Submit('submit');
        $videoResetData = new Zend_Form_Element_Submit('Reset');

        $this->addElements([$videoName,$videoUser,$videoSubmit,$videoResetData]);     

        foreach($this->getElements() as $element){
            $element->setDecorators(['ViewHelper']);
        }      
    }


}

