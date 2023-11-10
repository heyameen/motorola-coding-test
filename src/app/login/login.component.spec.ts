import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';


class MockAuthService {
  login(username: string, password: string): boolean {
    return username === 'testuser' && password === 'testpass';
  }
}

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, FormsModule ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    mockRouter.navigate.calls.reset();

  });

  it('should create a form with two controls', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make the username and password controls required', () => {
    let usernameControl = component.loginForm.get('username');
    let passwordControl = component.loginForm.get('password');

    usernameControl?.setValue('');
    passwordControl?.setValue('');

    expect(usernameControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('should call AuthService.login() with correct credentials', () => {
    let authServiceSpy = spyOn(authService, 'login').and.callThrough();
    let username = 'testuser';
    let password = 'testpass';

    component.loginForm.controls['username'].setValue(username);
    component.loginForm.controls['password'].setValue(password);
    component.onSubmit();

    expect(authServiceSpy).toHaveBeenCalledWith(username, password);
  });

  it('should navigate to home on successful login', () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpass');
    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not navigate to home on unsuccessful login', () => {
    component.loginForm.controls['username'].setValue('wronguser');
    component.loginForm.controls['password'].setValue('wrongpass');
    component.onSubmit();

    expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
  });


});
