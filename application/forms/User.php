<?php

class Application_Form_User extends Zend_Form
{

    public function init()
    {
       $userName = new Zend_Form_Element_Text('name');
       $userName->setLabel('User Name')
                ->setRequired(true)
                ->addFilter('StringTrim');
       $userName->addValidator('NotEmpty')->getValidator('NotEmpty')->setMessage('input user name is empty!');

       $userAge = new Zend_Form_Element_Text('age');
       $userAge->setLabel('User Age')
               ->setRequired(true)
               ->addFilter('StringTrim');
       $userAge->addValidator('NotEmpty')->getValidator('NotEmpty')->setMessage('input user age is empty!');
       $userAge->addValidator('Int',false)->getValidator('Int')->setMessage('must be integer');

       $btnAdd = new Zend_Form_Element_Submit('Add');
       $btnUpdate = new Zend_Form_Element_Submit('Update');

       $this->addElements([$userName,$userAge,$btnAdd,$btnUpdate]);

       foreach($this->getElements() as $element){
           $element->setDecorators(['ViewHelper']);
       }
    }


}

