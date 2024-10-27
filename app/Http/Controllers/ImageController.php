<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $images = Image::all();
        // return response()->json($images, 200);
        return $images;
        
    }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // Armazenamento do arquivo de imagem
        $path = $request->file('imagem')->store('imagens', 'public');

        // Criação do registro no banco de dados
        $image = Image::create([
            'nome' => $request->nome ?? 'Sem título',
            'descricao' => $request->descricao ?? '',
            'url' => Storage::url($path),
            'tamanho' => $request->file('imagem')->getSize(),
            'data_criacao' => now(),
        ]);

        // return response()->json($image, 201);
        return response(
            ['location' => route('pessoas.show', $image->id)],
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
        // return response()->json($image, 200);
        return $image;

    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Image $image)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        //
        // Atualiza os campos, se fornecidos
        if ($request->hasFile('imagem')) {
            // Deleta a imagem anterior, se necessário
            Storage::disk('public')->delete($image->url);

            // Armazena a nova imagem
            $path = $request->file('imagem')->store('imagens', 'public');
            $image->url = Storage::url($path);
            $image->tamanho = $request->file('imagem')->getSize();
        }

        $image->nome = $validated['nome'] ?? $image->nome;
        $image->descricao = $validated['descricao'] ?? $image->descricao;
        $image->save();

        // return response()->json($image, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        // Remove a imagem do armazenamento
        Storage::disk('public')->delete($image->url);

        // Deleta o registro do banco de dados
        $image->delete();

        // return response()->json(['message' => 'Imagem deletada com sucesso.'], 200);
    }
}