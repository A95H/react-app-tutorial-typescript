import axios, { AxiosRequestHeaders } from 'axios';
import Config from '../models/config';
let config: Config = require('../config/config.json');

abstract class ApiService<T, CreateResponse, UpdateResponse, DeleteResponse> {
    private baseUrl: string = config.url ?? '';
    private headers: AxiosRequestHeaders = {
        'Content-Type': 'application/json',
    };
    endpoint: String = '';

    async getOne(id: String, endpoint?: string): Promise<T> {
        this.endpoint = endpoint ?? this.endpoint;
        var res = await axios.get(this.baseUrl + this.endpoint + '/' + id ?? '', { headers: this.headers });
        if (res.status === 200) {
            return this.fromJson(res.data) as T;
        } else {
            throw new Error(res.statusText);
        }
    }

    async getAll(endpoint?: string): Promise<T[]> {
        var res = await axios.get(this.baseUrl + this.endpoint, { headers: this.headers });
        if (res.status === 200) {
            return this.fromJsonArray(res.data) as T[];
        } else {
            throw new Error(res.statusText);
        }
    }

    async create(data: any, endpoint?: string): Promise<CreateResponse> {
        this.endpoint = endpoint ?? this.endpoint;
        var res = await axios.post(this.baseUrl + this.endpoint, data, { headers: this.headers });
        if (res.status === 200 || res.status === 201) {
            return this.fromJsonCreate(res.data);
        } else {
            throw new Error(res.statusText);
        }
    }

    async delete(id: String, endpoint?: string): Promise<DeleteResponse> {
        this.endpoint = endpoint ?? this.endpoint;
        var res = await axios.delete(this.baseUrl + this.endpoint + '/' + id ?? '', { headers: this.headers });
        if (res.status === 200) {
            return this.fromJsonDelete(res.status, res.data);
        } else {
            throw new Error(res.statusText);
        }
    }

    abstract fromJson(data: any): T;
    abstract fromJsonArray(data: any): T[];
    abstract fromJsonCreate(data: any): CreateResponse;
    abstract fromJsonUpdate(data: any): UpdateResponse;
    abstract fromJsonDelete(status: number, data?: any): DeleteResponse;
}
export default ApiService;
