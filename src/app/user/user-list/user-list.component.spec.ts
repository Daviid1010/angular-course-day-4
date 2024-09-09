import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [UserService]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    // injecting and mocking service for component
    userService = TestBed.inject(UserService);
    userServiceSpy = spyOn(userService, 'getUsers').and.returnValue(of([
      {id: 1, name: 'John Doe'},
      {id: 2, name: 'Jane Doe'}
    ]));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrive users from the UserService on init', () => {
    // detectChanges gets into ngOnInit
    fixture.detectChanges();
    expect(userServiceSpy).toHaveBeenCalled();
  });

  it('should get users from UserService when the refresh button is clicked', () => {
    fixture.detectChanges();
    // empties calls so we can check refresh
    userServiceSpy.calls.reset();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(userServiceSpy).toHaveBeenCalled();
  })
});
