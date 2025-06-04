import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Encuesta } from '../../services/encuesta';
import { MatDialog } from '@angular/material/dialog';
import { DialogoResultadoEncuestaComponent } from '../dialogo-resultado-encuesta/dialogo-resultado-encuesta.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class EncuestaComponent implements OnInit {
  encuestas: any;
  usuarioActual: string | null;
  admin = '"admin@gmail.com"';

  public forma: FormGroup;
  pais: any = {
    name: {
      common: '',
    },
    foto: '',
  };
  encuestaSubida: boolean;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    public dialog: MatDialog
  ) {
    this.usuarioActual = localStorage.getItem('user');
    this.encuestaSubida = false;

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, this.spacesValidator]],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, this.minimumAgeValidator()]],
      telefono: ['', [this.lengthValidator, Validators.required]],
      pregunta1: ['', Validators.required],
      pregunta2: ['', Validators.required],
      pregunta3: ['', Validators.required],
    });
  }

  private lengthValidator(control: AbstractControl): null | object {
    const telefono = <string>control.value;
    const length = telefono.length;

    if (length != 10) {
      return length ? { okLength: true } : null;
    }
    return null;
  }

  private minimumAgeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control.value);
      const birthdate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthdate.getFullYear();
      const isOldEnough =
        age > 18 ||
        (age === 18 &&
          today.getMonth() >= birthdate.getMonth() &&
          today.getDate() >= birthdate.getDate());
      console.log(isOldEnough);
      return isOldEnough ? null : { underage: true };
    };
  }

  ngOnInit(): void {
    this.encuestas = collection(this.afs, 'encuestas');
  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces ? { containsSpaces: true } : null;
  }

  public aceptar(): void {
    this.encuestaSubida = true;
    var encuesta: Encuesta = this.forma.getRawValue();
    addDoc(this.encuestas, encuesta);
  }

  openResultadosDialog() {
    //this.dialog.open(DialogoResultadoEncuestaComponent);
  }
}
