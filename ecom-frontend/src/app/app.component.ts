import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {CartService} from './cart.service';
import {AuthService} from './auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title(title: any) {
        throw new Error('Method not implemented.');
    }
  actions : Array<any> = [

    {title:"Home","route":"/products"},



  ]
CurrentAction:any;
  showAccountMenu = false;


  cartCount = 0;

  constructor(private cartService: CartService, private authService: AuthService,private router: Router) {}
  userName: string | null = null;


  ngOnInit(): void {
    this.userName = this.authService.getFirstName();
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }


  toggleAccountMenu(): void {
    this.showAccountMenu = !this.showAccountMenu;
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showAccountMenu = false;
    }
  }
  updateUserName() {
    this.userName = this.authService.getUserName();
  }
  logout() {
    this.authService.logout();
    this.updateUserName()
    this.router.navigate(['/login']);
  }
  SetCurrentAction(action: any) {
    this.CurrentAction=action;
  }
}
