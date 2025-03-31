import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';
import { Car } from '../../model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = `${environment.apiUrl}/api/cars`;

  constructor(
    private http: HttpClient,
    private authService: AuthService  // Para pegar o token
  ) { }

  // Função para adicionar um carro
  addCar(carData: Car): Observable<Car> {
    const token = this.authService.getUserToken();

    // Criando os headers com o token e o JSESSIONID
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // O formato do token pode variar dependendo da implementação
    });

    // Enviando a requisição POST para a API
    return this.http.post<Car>(
      this.apiUrl,
      carData,
      { headers }
    );
  }

  getAllCars(): Observable<Car[]> {
    const token = this.authService.getUserToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });


    console.log('url', this.apiUrl)

    return this.http.get<Car[]>(
      this.apiUrl,
      { headers }
    );
  }

  // Função para buscar os detalhes de um carro
  getCarById(carId?: string): Observable<Car> {
    const token = this.authService.getUserToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/${carId}`);
  }

  // Função para enviar imagem
  uploadCarImage(carId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${carId}/upload`, formData);
  }

  deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${carId}`);
  }

}
