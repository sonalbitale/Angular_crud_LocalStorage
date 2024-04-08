import { Component, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // title = 'crudwithlocalstorage';
  @ViewChild('myModal') model:ElementRef |  undefined;
  studentObj: Student = new Student();
  studentList: Student[] = []
  ngOnInit(): void {

    const localData = localStorage.getItem("angular17crud");
    if(localData != null){
this.studentList = JSON.parse(localData)
    }
  
      
  }
  openModel(){
   
    const model = document.getElementById("myModal");
    if(model !=null){
      model.style.display='block';
    }
  }

  closeModel(){
    this.studentObj = new Student();     // calling constructor pf Student class
    if(this.model !=null){
      this.model.nativeElement.style.display='none';
    }

  }
  onDelete(item:Student){
const isDelete = confirm("are you sure u wanna delete");
if(isDelete){
  const currentRecord = this.studentList.findIndex(m=> m.id === this.studentObj.id);
this.studentList.splice(currentRecord,1);
localStorage.setItem('angular17crud',JSON.stringify(this.studentList));


}

  }

  onEdit(item:Student){
    this.studentObj = item;
    this.openModel();
  }

updateStud(){
const currentRecord = this.studentList.find(m=> m.id === this.studentObj.id);
if(currentRecord != undefined){
  currentRecord.name= this.studentObj.name;
  currentRecord.address= this.studentObj.address;

  currentRecord.mobileNo= this.studentObj.mobileNo;


};
localStorage.setItem('angular17crud',JSON.stringify(this.studentList));
this.closeModel();

}
  saveStudent(){
    debugger;
   
const  isLocalPresent = localStorage.getItem("angular17crud");

if(isLocalPresent !=null){
  const oldArray = JSON.parse(isLocalPresent); 
  this.studentObj.id= oldArray.length+1;

  oldArray.push(this.studentObj);
  this.studentList = oldArray;
  localStorage.setItem('angular17crud',JSON.stringify(oldArray));

}else{
  const newArr =[];
  newArr.push(this.studentObj);
  this.studentObj.id= 1;

  this.studentList=newArr;
  localStorage.setItem('angular17crud',JSON.stringify(newArr));

}
this.closeModel();

  }
 
}

export class Student{
  id:number;
  name:string;
  mobileNo : string;
  email: string;
  city:string;
  state: string;
  pincode:string;
  address:string;

  constructor(){
    this.id=0;
    this.address='';
    this.city='';
    this.email='';
    this.state='';
    this.pincode='';
    this.mobileNo='';
    this.name='';

  }
}
