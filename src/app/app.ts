import { Component, HostListener, signal } from '@angular/core';
import { PROJECT_ENQUIRY_FORM_URL } from './contact.config';
@Component({ selector: 'app-root', imports: [], templateUrl: './app.html', styleUrls: ['./app.scss', './responsive.scss'] })
export class App {
  readonly projectFormUrl = PROJECT_ENQUIRY_FORM_URL;
  readonly menuOpen = signal(false);
  readonly dark = signal(false);
  readonly motion = signal(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  setHoverOrigin(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--wipe-origin', event.clientY < bounds.top + bounds.height / 2 ? 'top' : 'bottom');
  }
  readonly expertiseProgress = signal(0);
  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateExpertise() {
    const section = document.getElementById('expertise');
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    const distance = bounds.height - window.innerHeight;
    this.expertiseProgress.set(distance > 0 ? Math.min(1, Math.max(0, -bounds.top / distance)) : 0);
  }
  get expertiseOffset() {
    const viewport = document.querySelector<HTMLElement>('.expertise-window');
    const track = viewport?.querySelector<HTMLElement>('.expertise-track');
    return -this.expertiseProgress() * Math.max(0, (track?.scrollWidth ?? 0) - (viewport?.clientWidth ?? 0));
  }
  @HostListener('window:keydown.escape')
  closeMenu() { this.menuOpen.set(false); }
  get expertiseIndex() { return Math.min(this.skills.length, 1 + Math.round(this.expertiseProgress() * (this.skills.length - 1))); }
  readonly skills = [
    {name:'Frontend', number:'01', tools:['Angular','React','TypeScript','JavaScript','HTML & CSS','SCSS','Bootstrap','Material UI']},
    {name:'Backend', number:'02', tools:['Node.js','Express','Python','Django','Java']},
    {name:'Data & platforms', number:'03', tools:['PostgreSQL','MongoDB','MySQL','SQL']}
  ];
  readonly roles = [
    {title:'Full Stack Software Developer',company:'KnoDTec Solutions Private Limited',date:'JAN 2024 — PRESENT',type:'CURRENT ROLE',location:'Bengaluru · Full-time'},
    {title:'Full-stack Developer Trainee',company:'Itvedant Education Pvt. Ltd.',date:'MAY 2022 — JAN 2024',type:'TRAINING',location:''},
    {title:'Fullstack Software Engineer',company:'Indhan.Online',date:'JUN 2023 — SEP 2023',type:'INTERNSHIP',location:''},
    {title:'Web Developer Trainee',company:'Webgyor Communications',date:'JUL 2017 — DEC 2017',type:'INTERNSHIP',location:'Kozhikode'}
  ];
  readonly certificates = [
    ['Python for Web Development','IBM','python-web-development.jpeg'],['Java Fundamentals','IBM','java-fundamentals.jpeg'],['Java Essentials','Itvedant','java-essentials.jpg'],['Node.js, Express & MongoDB','Itvedant','node-express-mongodb.jpg'],['Django Framework','Itvedant','django-framework.jpg'],['Angular 14','Itvedant','angular-14.jpg'],['Python Programming','Itvedant','python-programming.jpg'],['SQL','Itvedant','sql.jpg'],['Web Designing','Itvedant · Sep 2022','web-designing.jpg']
  ];
}
