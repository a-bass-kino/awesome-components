import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from '../../../environments/environment';

@Injectable()
export class PostsService {
    
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
    }

    newComment(postCommented: {comment: string, postId: number}) {

    }
}