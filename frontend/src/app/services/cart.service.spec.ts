import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { of } from 'rxjs'; // Make sure this import is present

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartService,
        CookieService,
        {
          provide: UserService,
          useValue: {
            currentUser: of(null) // Mocked user service
          }
        }
      ]
    });

    service = TestBed.get(CartService); // Use get() instead of inject()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
