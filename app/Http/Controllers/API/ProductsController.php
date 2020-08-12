<?php

namespace App\Http\Controllers\API;

use App\Products;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;
use Validator;
use DB;

class ProductsController extends Controller
{

    public function postValidator(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'title'             => 'required | string | max:255',
            'content'           => ' string',
            'price'             => ' integer ',
            'stock_qty'         => 'integer',
            'sku_number'       => 'integer',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'error'=>$validator->errors(),
                'data' =>$request], 401);
        }
        else{
            return response()->json(['status' => 200]);
        }

    }

    public function index()
    {
        //
    }

    public function create(Request $request)
    {

        $validation = $this->postValidator($request)->status();

        if($validation == 200){
            $postData = $request->all();

            $columnValue = array(
                'title'             => $postData['title'],
                'content'         => $postData['content'],
                'price'       => $postData['price'],
                'stock_qty'           => $postData['stock_qty'],
                'sku_number'       => $postData['sku_number'],
            );

            $post = Products::create($columnValue);

            return response()->json(['message' => 'Product submitted','data'=>$post]);

        }
        else{
            return $this->postValidator($request);
        }

    }

    public function updatePost(Request $request){

        $validation = $this->postValidator($request)->status();

        if($validation == 200){
            $postData = $request->all();
            $postId = $postData['id'];

            $columnValue = array(
                'title'             => $postData['title'],
                'content'         => $postData['content'],
                'price'       => $postData['price'],
                'stock_qty'           => $postData['stock_qty'],
                'sku_number'       => $postData['sku_number'],
            );

            $postupdate = Products::where('id', $postId )->update($columnValue);
            return response()->json(['message' => 'Product submitted','data'=>$postupdate]);

        }
        else{
            return $this->postValidator($request);
        }

    }
}
