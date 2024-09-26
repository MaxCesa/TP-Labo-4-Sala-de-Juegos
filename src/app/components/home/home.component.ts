import { Component, inject, OnInit } from '@angular/core';
import { Auth, getAuth, User, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
