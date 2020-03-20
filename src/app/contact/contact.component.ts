import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formulaireContact: FormGroup;
  constructor(private httpClient: HttpClient) { }

  
  ngOnInit():void {
    this.formulaireContact=new FormGroup(
    {
     nom: new FormControl(),
     email: new FormControl(),
     message:new FormControl(),
     sujet:  new FormControl()
    }
    );
    }

    envoieMessage(){
      
      const message=this.formulaireContact.get("message").value;
      const email=this.formulaireContact.get("email").value;
      const sujet=this.formulaireContact.get("sujet").value;
      const nom=this.formulaireContact.get("nom").value;
      const corpsMessage = "Bonjour "+"\n"+"\n"+
      "un client "+ nom +" a envoyé:"+"\n"+
      message+"\n"+"\n"+"\n"+"\n"+
      "Coordonnées:"+"\n"+ email+"\n";
  
    this.httpClient.post('http://localhost:8080/webModule' +'/envoieMail',
            {
              'adresseExpediteur': 'excilysjanvier2020@gmail.com',
              'motDePasseExpediteur': 'ugronwlpbdjjduzt',
              'sujet': sujet,
              'corpsDuCourier':corpsMessage ,
              'adresseDestinataire':'icoulibaly@excilys.com'
            }).subscribe(data1 => {
          }, error1 => {
            console.log(error1);
          });
    }
  
  
}
